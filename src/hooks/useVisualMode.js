import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory(prev => { 
        prev.pop();
        return [...prev, newMode]
      });
    }
    else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  const  back = function () {
    if (history.length > 1) {
      history.pop();
      const lastMode = history[history.length-1];
      setMode(lastMode);
      setHistory(history);

    }
  
  }

  return { mode, transition, back };

};