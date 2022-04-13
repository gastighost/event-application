import styles from "../styles/Home.module.css";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function Home(props) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default Home;
