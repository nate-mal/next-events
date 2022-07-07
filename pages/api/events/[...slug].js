import excuteQuery from "../../../lib/db";

export const queryFilteredEvents = async (year, month) => {
  const response = await excuteQuery({
    query: `SELECT * FROM events WHERE date_part('year', date) =${year} AND date_part('month', date) = ${month}`,
  });
  if (response.error) {
    throw new Error(response);
  }
  const eventsData = response;
  return JSON.stringify(
    eventsData.length != 0
      ? eventsData.map((event) => {
          return { ...event, id: String(event.id) };
        })
      : []
  );
};

const FilteredEvents = async (req, res) => {
  const [year, month] = req.query.slug;
  const numMonth = +month;
  const numYear = +year;
  try {
    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      throw { badFilter: true };
    }
    const eventsData = await queryFilteredEvents(year, month);
    res.status(200).json(eventsData);
  } catch (error) {
    if (error.badFilter)
      res.status(422).json({
        message: `Bad filter please adjust your values!`,
        error: error,
      });
    console.log(error);

    res.status(422).json({
      message: `Something went wrong, please try again later!`,
      error: error,
    });
  }
};
export default FilteredEvents;
