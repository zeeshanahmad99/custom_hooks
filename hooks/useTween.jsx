import { useState, useEffect } from 'react';

// From React Training

export const useTween = (endValue) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (endValue > value) {
      const timer = setTimeout(() => {
        setValue(value + 1);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, endValue]);

  return value;
};

const AnimatedMinutes = ({ minutes, ...rest }) => {
  const value = useTween(minutes);

  return <span children={value} {...rest} />;
};

<AnimatedMinutes minutes={tweeningMinutes} className="Calendar_minutes_text" />;

/* 

// Advanced useTween

import { useState, useEffect } from "react"

const getProgress = (elapsed, duration) => Math.min(elapsed / duration, 1)
const easeOut = progress => Math.pow(progress - 1, 5) + 1

export default function useTween(duration, onRest) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = performance.now()
    let elapsed = 0
    let frame

    const tick = now => {
      elapsed = now - start
      const progress = getProgress(elapsed, duration)
      setValue(easeOut(progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        onRest && onRest()
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [duration, onRest])

  return value
}

import {playNotes} from 'app/playSoung'

const AnimatedMinutes = ({ minutes, ...rest }) => {
  const progress = useTween(minutes * 200);
  const tweeningMinutes = Math.max(0, Math.round(progress * minutes))
  useEffect(playNotes, [tweeningMinutes]) // sync sound with change tweeningMinutes
  return <span children={tweeningMinutes} {...rest} />;
};

*/
