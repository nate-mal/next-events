import Head from "next/head";

import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { queryFeaturedEvents } from "./api/events/featured";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
function HomePage(props) {
  const [subMessage, setSubMessage] = useState();

  const subscribeHandler = async (email) => {
    axios
      .post("/api/events/subscribe", {
        email: email,
      })
      .then(function (response) {
        console.log(response);
        return response.data.message;
      })
      .then((data) => {
        console.log(data);
        setSubMessage(data);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.error.message);
        setSubMessage(error.response.data.error.message);
      });
  };

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration
        message={subMessage}
        onSubmit={subscribeHandler}
        resetForm={() => setSubMessage(undefined)}
      />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await queryFeaturedEvents();
  const featuredEvents = JSON.parse(response);
  console.log(featuredEvents);
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 10,
  };
}

export default HomePage;
