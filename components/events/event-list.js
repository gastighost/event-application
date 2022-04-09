import EventItem from "./event-item";

function EventList(props) {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => {
        return (
          <EventItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            date={item.date}
            location={item.location}
          />
        );
      })}
    </ul>
  );
}

export default EventList;
