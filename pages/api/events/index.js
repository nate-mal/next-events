import excuteQuery from "../../../lib/db";

export const queryAllEvents = async () => {
  const eventsData = await excuteQuery({
    query: "SELECT * FROM events",
  });
  return JSON.stringify(
    eventsData[0].id
      ? eventsData.map((event) => {
          return { ...event, id: String(event.id) };
        })
      : eventsData
  );
};

const AllEvents = async (req, res) => {
  try {
    const eventsData = await queryAllEvents();
    res.status(200).json(eventsData);
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: `Something went wrong, please try again later!`,
      error: error,
    });
  }
};
export default AllEvents;

// export default async (req, res) => {
//     try {
//         console.log("req nom", req.body)
//       const result = await excuteQuery({
//           query: 'INSERT INTO post(content) VALUES(?)',
//           values: [req.body.content],
//       });
//       console.log( "ttt",result );
//   } catch ( error ) {
//       console.log( error );
//   }

//   };
