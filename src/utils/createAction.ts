interface IAction<T> {
  type: string;
  payload?: T;
}

const createAction = (type: string) => <T>(payload?: T): IAction<T> => {
  return payload ? { type, payload } : { type };
};

export default createAction;
