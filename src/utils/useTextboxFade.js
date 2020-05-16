import { useSpring, useViewportScroll } from 'framer-motion';
import { useState } from 'react';
import { useRelative } from './useRelative';

export const useTextboxFade = () => {
  const [top, setTop] = useState(0);
  const width = useSpring(0, { damping: 10 });
  const left = useSpring(0, { damping: 10 });
  const opacity = useSpring(0, { damping: 10 });
  const { scrollY } = useViewportScroll();
  const [scrollSnapshot, setScrollSnapshot] = useState(0);
  const scrollAdjustedTop = useRelative([top, scrollY, scrollSnapshot], (t, y, s) => {
    return t + s - y;
  });

  const state = {
    top: scrollAdjustedTop,
    width,
    left,
    opacity,
  };
  const setState = (newState) => {
    setTop(newState.top);
    setScrollSnapshot(() => scrollY.get());
    width.set(newState.width);
    left.set(newState.left);
    opacity.set(newState.opacity);
  }
  return [state, setState];
}
