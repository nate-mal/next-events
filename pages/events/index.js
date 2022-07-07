import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { queryAllEvents } from "../api/events/index";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await queryAllEvents();
  const events = JSON.parse(response);

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
