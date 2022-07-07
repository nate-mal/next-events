import excuteQuery from "../../../../lib/db";

export const queryEventById = async (eventId) => {
  const eventData = await excuteQuery({
    query: `SELECT * FROM events WHERE id = ${eventId}`,
  });

  return JSON.stringify(
    eventData.length != 0
      ? { ...eventData[0], id: String(eventData[0].id) }
      : null
  );
};

const EventById = async (req, res) => {
  const { eventId } = req.query;
  try {
    const eventData = await queryEventById(eventId);
    res.status(200).json(eventData);
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: `Something went wrong, please try again later!`,
      error: error,
    });
  }
};
export default EventById;
