import {Observable} from "rxjs";
import {useEffect, useState} from "react";

export const useObservable: <T>(observable: Observable<T>) => T | null = <T>(observable: Observable<T>) => {
  const [state, setState] = useState<T>(null as any);

  useEffect(() => {
    const subscription = observable.subscribe((value) => setState(value));
    return () => subscription.unsubscribe();
  }, [observable]);

  return state;
};