import "./index.css";

// MUI
import { Container } from "@mui/material";

// Components
import Duration from "./Components/duration";
import Stats from "./Components/Stats";
import TypingArea from "./Components/typingArea";

// React
import { useState } from "react";

// Context
import {
  TimerContext,
  WPSContext,
  ErrorsContext,
  AccuracyContext,
} from "./Contexts/GameContext";

function App() {
  const [Timer, setTimer] = useState(60);
  const [ErrorStat, setErrorStat] = useState(0);
  const [AccuracyStat, setAccuracyStat] = useState(0);
  const [WPS, setWPS] = useState(0);
  return (
    <Container maxWidth="md" className="my-12">
      <div className="text-center mb-7">
        <h1 className="text-4xl font-bold mb-3">Typing Speed Test</h1>
        <p>Test your typing speed and accuracy in real-time</p>
      </div>
      <TimerContext.Provider value={{ Timer, setTimer }}>
        <WPSContext.Provider value={{ WPS, setWPS }}>
          <ErrorsContext.Provider value={{ ErrorStat, setErrorStat }}>
            <AccuracyContext.Provider
              value={{ AccuracyStat, setAccuracyStat }}
            >
              <Duration />
              <Stats />
              <TypingArea />
            </AccuracyContext.Provider>
          </ErrorsContext.Provider>
        </WPSContext.Provider>
      </TimerContext.Provider>
    </Container>
  );
}

export default App;
