import {useRef} from "react";

export default function useCustomEffect(effect, deps) {
  const prevDeps = useRef();
  const cleanup = useRef();

  const changed =
    !prevDeps.current ||
    deps.some((d, i) => !Object.is(d, prevDeps.current[i]));

  if (changed) {
    cleanup.current?.();
    cleanup.current = effect();
    prevDeps.current = deps;
  }
}
