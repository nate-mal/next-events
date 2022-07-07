import excuteQuery from "../../../lib/db";

export const queryFeaturedEvents = async () => {
  const eventsData = await excuteQuery({
    query: "SELECT * FROM events WHERE isFeatured = true",
  });
  return JSON.stringify(
    eventsData.map((event) => {
      return { ...event, id: String(event.id) };
    })
  );
};

const FeaturedEvents = async (req, res) => {
  try {
    const eventsData = await queryFeaturedEvents();
    res.status(200).json(eventsData);
  } catch (error) {
    res.status(422).json({
      message: `Something went wrong, please try again later!`,
      error: error,
    });
    console.log(error);
  }
};
export default FeaturedEvents;
