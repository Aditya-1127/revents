import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToEvents } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (events) => dispatch(listenToEvents([events])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) return <LoadingComponent content='Loading events...' /> // if we dont have an event or an error either

  if(error) return <Redirect to='/error'/>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSideBar attendees={event?.attendees} /> 
        {/* this basically means that we may have attendees and we may not have them */}
      </Grid.Column>
    </Grid>
  );
}
