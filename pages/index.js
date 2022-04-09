import styles from "../styles/Home.module.css";
import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default Home;
