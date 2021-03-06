/* global google */
import React,{useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { useDispatch, useSelector, } from "react-redux";
import { listenToEvents } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectionInput from "../../../app/common/form/MySelectionInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlacetInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.async);
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required("City is Required"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Venue is Required"),
    }),
    date: Yup.string().required(),
  });

  async function handleCancelTOggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {}
  }

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (events) => dispatch(listenToEvents([events])),
    deps: [match.params.id, dispatch],
    shouldExecute: !!match.params.id,
  });

  if (loading) return <LoadingComponent content="Loading events..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectionInput
              name="category"
              placeholder="Event category"
              options={categoryData}
            />
            <MyTextArea
              name="description"
              placeholder="Event description"
              rows={3}
            />
            <Header sub color="teal" content="Event Location Details" />
            <MyPlacetInput name="city" placeholder="Event city" />
            <MyPlacetInput
              name="venue"
              disabled={!values.city.latLng}
              placeholder="Event venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                type: ["establishment"],
              }}
            />
            <MyDateInput
              name="date"
              placeholderText="Event date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate event"
                    : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              as={Link}
              to="/events"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure?"
            : "This will cancel the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelTOggle(selectedEvent)}
      />
    </Segment>
  );
}
