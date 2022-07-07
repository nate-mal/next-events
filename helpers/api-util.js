export async function getAllEvents() {
  const response = await fetch("http://localhost:3000/api/events");
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      ...data[key],
      id: String(data[key].id),
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const jsonData = await fetch("http://localhost:3000/api/events/featured");
  let data = [];
  data = await jsonData.json();
  return data.map((event) => {
    return { ...event, id: String(event.id) };
  });
}

export async function getEventById(id) {
  const jsonData = await fetch(`http://localhost:3000/api/events/${id}`);
  let data = [];
  data = await jsonData.json();
  return data.map((event) => {
    return { ...event, id: String(event.id) };
  });
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
