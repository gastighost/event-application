import EventItem from "./event-item";
import styles from "./event-list.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <ul className={styles.list}>
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
