import Statistics from "../helpPage/Statistics";
import PopularDishes from "../helpPage/PopularDishes";
import NewDishes from "../helpPage/NewDishes";
import Advertisement from "../helpPage/Advertisement";
import ActiveUsers from "../helpPage/ActiveUsers";
import Events from "../helpPage/Events";

export default function HomePage() {
  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
