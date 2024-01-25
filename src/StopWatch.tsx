import React, { useRef, useState } from "react";
import { start } from "repl";

//define time proportions
const msInSecond = 1000;
const secondsInMinute = 60;
const minutesInHour = 60;
const msInMinute = secondsInMinute * msInSecond;
const msInHour = minutesInHour * msInMinute;

//StopWatch handles all timing functionality.
export default function StopWatch() {
  //lastTick is used to improve reliability in the actual calculation of duration in milliseconds
  const lastTick = useRef(null);
  const [duration, setDuration] = useState<number | null>(null);
  //timer holds the setInterval so that it can be stopped.
  const [timer, setTimer] = useState<number | null>(null);

  //startTime calculates and sets the total duration of the timer in milliseconds.
  const startTime = () => {
    lastTick.current = Date.now();
    setTimer(
      window.setInterval(() => {
        const now = Date.now();
        const deltaTime = now - lastTick.current;
        setDuration((d) => d + deltaTime);
        lastTick.current = now;
      }, 1)
    );
  };

  const stopTime = () => {
    window.clearInterval(timer);
    // setTimer(null);
    console.log(timer);
  };

  return (
    <>
      <p>{duration}</p>
      <button onClick={startTime}>Start</button>
      <button onClick={stopTime}>Stop</button>
    </>
  );
}
