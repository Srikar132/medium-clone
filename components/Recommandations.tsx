import AutoScrollCarousel from "./AutoVerticalScroll";
import { Mail } from "lucide-react";
import Ping from "./Ping";
import NavLink from "./ui/nav-link";
import { Button } from "./ui/button";

const Recommendations = () => {
  return (
    <div className="w-full mx-auto max-w-3xl dark:bg-secondary-dark p-5 rounded-lg bg-white ">
      <div className="flex-center flex-col space-y-10">
        <h3 className="flex w-full items-center gap-x-3 tracking-wider font-medium relative">
          <Ping />
          <span className="relative">Popular Posts</span>
        </h3>

        <AutoScrollCarousel />

        <h3 className="flex  w-full items-center gap-x-3 tracking-wider font-medium relative">
          <Ping className="animate-pulse" />
          <span className="relative">Categories</span>
        </h3>

        <div className="flex flex-wrap gap-2 ">
          <NavLink variant="green" title="Life Style" />
          <NavLink variant="pink" title="Robotics" />
          <NavLink variant="blue" title="Deep Learning" />
          <NavLink variant="orange" title="Vehicles" />
          <NavLink variant="teal" title="College" />
          <NavLink variant="red" title="Love" />
        </div>

      </div>
    </div>
  );
};

export default Recommendations;
