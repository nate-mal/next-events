import { Fragment, useState } from "react";
import Head from "next/head";

// import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { queryEventById } from "../api/events/[eventId]";
import { queryEventCommentsById } from "../api/events/[eventId]/comments";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";
import axios from "axios";
import { queryFeaturedEvents } from "../api/events/featured";
function EventDetailPage(props) {
  const event = props.selectedEvent;
  const [comments, setComments] = useState(props.eventComments);
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  const newCommentHandler = async (comment) => {
    console.log(comment);
    const response = await axios.post(
      `/api/events/${event.id}/comments`,
      comment
    );
    console.log(response);
    if (response.status === 201) {
      const data = await fetch(`/api/events/${event.id}/comments`);
      const updatedComments = await data.json();
      console.log(updatedComments);
      setComments(updatedComments);
      return { status: "ok" };
    }
  };

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments
        onNewComment={newCommentHandler}
        eventId={event.id}
        comments={comments}
      />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  let event;
  let comments;
  try {
    const response = await queryEventById(eventId);
    event = JSON.parse(response);
    const comData = await queryEventCommentsById(eventId);
    comments = JSON.parse(comData);
    console.log(comments);
  } catch (error) {
    console.log("Hei error while fetching event data" + error);
  }
  if (!event) {
    return { notFound: true };
  }
  return {
    props: {
      selectedEvent: event,
      eventComments: comments,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const response = await queryFeaturedEvents();
  const events = JSON.parse(response);

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
