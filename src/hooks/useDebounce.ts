import { useState, useEffect } from "react";
import { AnyAction, Dispatch } from "redux";
import { IAction } from "../utils/createAction";

interface iState {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const useDebounce = (
  dispatch: Dispatch<AnyAction>,
  action: <T>(payload?: T | undefined) => IAction<T>,
  delay = 300,
): iState => {
  const [state, setState] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(action(state));
    }, delay);
    return () => clearTimeout(timer);
  }, [dispatch, action, state, delay]);

  return { state, setState };
};

export default useDebounce;
