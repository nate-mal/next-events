import Head from "next/head";

import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { queryFeaturedEvents } from "./api/events/featured";
import axios from "axios";
import useSWR from "swr";
import { useState, useContext } from "react";
import NotificationContext from "../store/notification-context";
function HomePage(props) {
  const [subMessage, setSubMessage] = useState();
  const notificationCtx = useContext(NotificationContext);
  const subscribeHandler = async (email) => {
    notificationCtx.showNotification({
      title: "Subscribe",
      message: "We are almost there",
      status: "pending",
    });
    axios
      .post("/api/events/subscribe", {
        email: email,
      })
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setSubMessage(data.message);
        if (data.duplicate) {
          notificationCtx.showNotification({
            title: "Subscribe",
            message: data.message,
            status: "error",
          });
        } else {
          notificationCtx.showNotification({
            title: "Subscribe",
            message: data.message,
            status: "success",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.error.message);
        setSubMessage(error.response.data.error.message);
        notificationCtx.showNotification({
          title: "Subscribe",
          message: error.response.data.error.message,
          status: "error",
        });
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
