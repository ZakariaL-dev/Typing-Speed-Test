// React icons imports
import { LuGoal } from "react-icons/lu";
import { GiPowerLightning } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";

// Context
import {
  AccuracyContext,
  ErrorsContext,
  TimerContext,
  WPSContext,
} from "../Contexts/GameContext";

// React
import { useContext } from "react";

const Stats = () => {
  const { Timer } = useContext(TimerContext);
  const { ErrorStat } = useContext(ErrorsContext);
  const { AccuracyStat } = useContext(AccuracyContext);
  const { WPS } = useContext(WPSContext);
  return (
    <div className="flex items-center justify-between gap-6">
      {/* word per second */}
      <div className="cardStats">
        <GiPowerLightning className="cardIcon" />
        <h1 className="cardHeading">{WPS}</h1>
        <p className="text-violet-400">WPS</p>
      </div>
      {/* accuraccy */}
      <div className="cardStats">
        <LuGoal className="cardIcon" />
        <h1 className="cardHeading">{AccuracyStat} %</h1>
        <p className="text-violet-400">Accuracy</p>
      </div>
      {/* time */}
      <div className="cardStats">
        <MdOutlineTimer className="cardIcon" />
        <h1 className="cardHeading">{Timer}</h1>
        <p className="text-violet-400">Seconds</p>
      </div>
      {/* Errors */}
      <div className="cardStats">
        <MdOutlineErrorOutline className="cardIcon" />
        <h1 className="cardHeading">{ErrorStat}</h1>
        <p className="text-violet-400">Errors</p>
      </div>
    </div>
  );
};

export default Stats;
