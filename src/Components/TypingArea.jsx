// React icon
import { VscDebugStart } from "react-icons/vsc";
import { RiResetRightLine } from "react-icons/ri";

// React
import { useContext, useRef, useState } from "react";

// Context
import {
  AccuracyContext,
  ErrorsContext,
  TimerContext,
  WPSContext,
} from "../Contexts/GameContext";

const TypingArea = () => {
  // Variables
  const Sampletxt = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once, making it perfect for typing practice and font displays.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
    "Artificial intelligence is transforming the world in unprecedented ways. From healthcare to finance, AI systems are helping humans make better decisions and solve complex problems.",
    "The journey of a thousand miles begins with a single step. Every great achievement starts with the decision to try, and persistence is the key to turning dreams into reality.",
    "In the digital age, information is more accessible than ever before. However, the ability to critically evaluate sources and distinguish fact from fiction has become increasingly important.",
    "The complexity of modern web development often necessitates the use of robust frameworks and libraries, allowing developers to manage state and build scalable user interfaces efficiently.",
    "Exploring the cosmos reveals the vastness and mystery of the universe. Telescopes provide snapshots of distant galaxies, helping scientists understand the origins and fate of everything.",
    "Music theory provides a structured language for understanding rhythm, harmony, and melody. Mastery of these fundamentals is essential for both composition and performance across all genres.",
    "Effective communication is not just about speaking clearly, but also about active listening and understanding non-verbal cues. It is the foundation of successful personal and professional relationships.",
    "Creativity often involves blending existing concepts in novel ways. Design thinking, a structured approach to innovation, emphasizes empathy, ideation, and rapid prototyping to solve complex human challenges.",
  ];

  // Context
  let { Timer, setTimer } = useContext(TimerContext);
  const { setErrorStat } = useContext(ErrorsContext);
  const { setAccuracyStat } = useContext(AccuracyContext);
  const { setWPS } = useContext(WPSContext);

  const [TxtDisplay, setTxtDisplay] = useState("");
  const [loading, setloading] = useState(false);
  const [GamePlaying, setGamePlaying] = useState(false);
  const timerclockRef = useRef(null);
  const typedTxtRef = useRef("");
  // text
  const [CurrentTxt, setCurrentTxt] = useState("");
  const [TypedTxt, setTypedTxt] = useState("");
  const [errorIndices, setErrorIndices] = useState({});
  const [Read, setRead] = useState(false);

  // Reset function
  function resetGame() {
    if (timerclockRef.current) {
      clearInterval(timerclockRef.current);
    }
    setRead(false);
    setTimer(60);
    setTxtDisplay("");
    setloading(false);
    setGamePlaying(false);
    setCurrentTxt("");
    setTypedTxt("");
    setErrorStat(0);
    setAccuracyStat(0);
    setWPS(0);
    timerclockRef.current = null;
    typedTxtRef.current = "";
  }
  //Game start
  function startGame() {
    //
    setloading(true);
    setGamePlaying(true);
    // Game Text
    let textChosen = Math.floor(Math.random() * Sampletxt.length);
    let GameText = Sampletxt[textChosen];
    setTimeout(() => {
      setTxtDisplay(GameText);
    }, 800);

    // Text Comparing
    setCurrentTxt(GameText);

    // Timer temporary
    let timerclock = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          clearInterval(timerclockRef.current);
          setRead(true);
          return 60;
        }

        // Calculate WPS based on time passe
        const latestTypedTxt = typedTxtRef.current.trim();
        const wordsCompletedArray = latestTypedTxt
          .split(/\s+/)
          .filter((word) => word.length > 0);

        let completedWordCount = 0;
        if (latestTypedTxt.length > 0) {
          completedWordCount = latestTypedTxt.endsWith(" ")
            ? wordsCompletedArray.length
            : Math.max(0, wordsCompletedArray.length - 1);
        }

        const elapsed = 60 - newTime;

        if (elapsed > 0 && completedWordCount > 0) {
          const WPM = (completedWordCount / elapsed) * 60;
          setWPS(WPM.toFixed(2));
        }

        return newTime;
      });
    }, 1000);
    timerclockRef.current = timerclock;
  }
  // reset game
  function GameLogic() {
    if (GamePlaying) {
      resetGame();
    } else {
      startGame();
    }
  }
  // Calculating
  function CalculateTxt() {
    let errcount = 0;
    const newErr = {};
    if (!CurrentTxt) {
      return null;
    }
    for (let i = 0; i < TypedTxt.length; i++) {
      if (TypedTxt[i] !== CurrentTxt[i]) {
        newErr[i] = true;
        errcount++;
      }
    }
    setErrorIndices(newErr);
    setErrorStat(errcount);
    setAccuracyStat(
      Math.max(0, 100 - (errcount / CurrentTxt.length) * 100).toFixed(2)
    );
  }

  // render Sample txt
  function RenderDisplayTxt() {
    if (!CurrentTxt) return null;
    return (
      <>
        {CurrentTxt.split("").map((c, i) => {
          const isError = errorIndices[i];
          const hasBeenTyped = i < TypedTxt.length;
          const isNextChar = i === TypedTxt.length;
          let charClass = "";
          if (isNextChar) {
            charClass = "bg-amber-300";
          } else if (hasBeenTyped && isError) {
            charClass = "bg-red-500";
          } else if (hasBeenTyped && !isError) {
            charClass = "bg-green-500";
          } else {
            charClass = "";
          }

          return (
            <span key={i} className={charClass}>
              {c}
            </span>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="compCard">
        <header className="flex items-center justify-between text-violet-400 mb-3">
          <p>Ready to start ?</p>
          <p>{Timer}s remaining</p>
        </header>
        <div readOnly className="textArea mb-2 opacity-50">
          {RenderDisplayTxt()}
        </div>
        <textarea
          name="write"
          placeholder="Click Start to begin the test"
          className="textArea border-2 border-violet-500"
          value={TypedTxt}
          onChange={(e) => {
            const newTypedTxt = e.target.value;
            setTypedTxt(newTypedTxt);
            typedTxtRef.current = newTypedTxt;
            CalculateTxt();
          }}
          readOnly={Read}
        ></textarea>
      </div>
      <button
        className={
          loading === false
            ? "flex items-center gap-1.5 btn bg-violet-500 mx-auto shadow-violet-300 shadow-md transition-all ease-in-out duration-200 hover:bg-violet-400 hover:-translate-y-1"
            : "flex items-center gap-1.5 btn bg-gray-500 mx-auto shadow-gray-300 shadow-md transition-all ease-in-out duration-200 hover:bg-gray-400 hover:-translate-y-1"
        }
        onClick={() => {
          GameLogic();
        }}
      >
        {loading === false ? (
          <>
            <VscDebugStart className="text-2xl" />
            Start Test
          </>
        ) : (
          <>
            <RiResetRightLine className="text-2xl" />
            Reset Test
          </>
        )}
      </button>
    </>
  );
};

export default TypingArea;
//buttons events
// document.addEventListener("keydown", (e) => {
//   console.log(e.key);
// });
