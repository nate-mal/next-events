import excuteQuery from "../../../../lib/db";

export const queryEventCommentsById = async (eventId) => {
  const eventComments = await excuteQuery({
    query: `SELECT * FROM comments WHERE event_id = ${eventId}`,
  });
  return JSON.stringify(
    eventComments.map((comment) => {
      return { ...comment, id: String(comment.id) };
    })
  );
};
export const insertEventCommentForId = async (eventId, comment) => {
  const response = await excuteQuery({
    query: `INSERT INTO comments(name,email,text,event_id) VALUES('${comment.name}','${comment.email}', '${comment.text}','${eventId}');`,
  });
  return response;
};

const EventCommentsById = async (req, res) => {
  const { eventId } = req.query;
  if (req.method === "POST") {
    try {
      const comment = req.body;
      const response = await insertEventCommentForId(eventId, comment);
      res.status(201).json({
        message: `Comment for event with id: ${eventId} succesfully added`,
      });
    } catch (error) {
      res.status(422).json({
        message: `Something went wrong, please try again later!`,
        error: error,
      });
    }
  } else {
    try {
      const eventComments = await queryEventCommentsById(eventId);
      res.status(200).json(eventComments);
    } catch (error) {
      console.log(error);
    }
  }
};
export default EventCommentsById;
