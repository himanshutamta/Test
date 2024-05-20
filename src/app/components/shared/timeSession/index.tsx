"use client";
import { RootState } from "@/app/store/store";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTimer } from "react-timer-hook";

const TimeSession = () => {
  const user = useSelector((state: RootState) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 50);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    time,
    autoStart: true,
    onExpire: () => setShowPopup(true),
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "30px" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <Button
        size="sm"
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 15);
          restart(time);
        }}
        className="mb-2"
      >
        Start timer
      </Button>
      {showPopup && (
        <div className="bg-white p-2 rounded-xl">
          Hey{user[0].name} it's time for a quick 5-second break.{" "}
          <button
            className="bg-red-400  h-8 w-8 text-white hover:scale-95  rounded-full"
            onClick={() => {
              // Restarts to 5 minutes timer
              const time = new Date();
              time.setSeconds(time.getSeconds() + 15);
              restart(time);
              setShowPopup(false);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeSession;
