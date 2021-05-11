/* global google */
import cuid from "cuid";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, createEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectionInput from "../../../app/common/form/MySelectionInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlacetInput from "../../../app/common/form/MyPlaceInput";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
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
      address: Yup.string().required('City is Required')
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is Required')
    }),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/events");
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
              options = {{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                type: ['establishment']
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
    </Segment>
  );
}
