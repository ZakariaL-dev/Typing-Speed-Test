// React icons
import { IoIosTimer } from "react-icons/io";

// React
import { useContext } from "react";

// Context
import { TimerContext } from "../Contexts/GameContext";

const Duration = () => {
  const { Timer, setTimer } = useContext(TimerContext);
  return (
    <div className="flex items-center justify-between compCard">
      <h1 className="flex gap-1.5 items-center text-violet-900 font-semibold">
        <IoIosTimer className="text-2xl text-violet-500 font-bold" />
        Test Duration:
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => setTimer(30)}
          className={Timer === 30 ? "btn bg-violet-500" : "btn bg-violet-300"}
        >
          30s
        </button>
        <button
          onClick={() => setTimer(60)}
          className={Timer === 60 ? "btn bg-violet-500" : "btn bg-violet-300"}
        >
          60s
        </button>
        <button
          onClick={() => setTimer(120)}
          className={Timer === 120 ? "btn bg-violet-500" : "btn bg-violet-300"}
        >
          120s
        </button>
      </div>
    </div>
  );
};

export default Duration;
