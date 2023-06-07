import { useSelector, useDispatch } from 'react-redux';

// eslint-disable-next-line no-unused-vars
type AnyFunction = (...args: any[]) => any;

export function useRematch<S extends AnyFunction, A extends AnyFunction>(
  selector?: S,
  actions?: A,
): [ReturnType<S>, ReturnType<A>] {
  const dispatch = useDispatch();
  return [selector ? useSelector(selector) : undefined, actions ? actions(dispatch) : undefined];
}
