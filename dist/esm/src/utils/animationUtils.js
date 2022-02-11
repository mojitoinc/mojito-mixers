import { keyframes } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';

const shakeAnimation = keyframes `
  0% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }
  10% { transform: translate(calc(var(--multiplier, 1) * 1px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }
  20% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -3deg)); }
  30% { transform: translate(calc(var(--multiplier, 1) * 3px), 0) rotate(calc(var(--multiplier, 1) * 2deg)); }
  40% { transform: translate(calc(var(--multiplier, 1) * -1px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }
  50% { transform: translate(calc(var(--multiplier, 1) * 3px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }
  60% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -1deg)); }
  70% { transform: translate(calc(var(--multiplier, 1) * 1px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }
  80% { transform: translate(calc(var(--multiplier, 1) * -2px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }
  90% { transform: translate(2px, 0) rotate(2deg); }
  100% { transform: translate(0, 0) rotate(0); }
`;
function useShakeAnimation(element) {
    const [{ shakeCount, blip }, setShakeSate] = useState({
        shakeCount: 0,
        blip: false,
    });
    const isShaking = shakeCount > 0;
    const incrementCount = useCallback(() => {
        setShakeSate((prevShakeSate) => ({ shakeCount: prevShakeSate.shakeCount + 1, blip: false }));
    }, []);
    const resetCount = useCallback(() => {
        setShakeSate({ shakeCount: 0, blip: false });
    }, []);
    useEffect(() => {
        if (!element)
            return;
        if (isShaking) {
            element.addEventListener("animationend", resetCount);
        }
        else {
            element.removeEventListener("animationend", resetCount);
        }
    }, [resetCount, element, isShaking]);
    const shake = useCallback(() => {
        if (!element)
            return;
        if (isShaking) {
            setShakeSate((prevShakeSate) => ({ shakeCount: prevShakeSate.shakeCount, blip: true }));
            setTimeout(incrementCount);
            return;
        }
        incrementCount();
    }, [element, incrementCount, isShaking]);
    const multiplier = Math.min(1 + 2 * (shakeCount - 1) / 10, 3);
    return [isShaking && !blip ? {
            "--multiplier": multiplier,
            animation: `${shakeAnimation} 1s linear normal`,
        } : {}, shake];
}

export { useShakeAnimation };
//# sourceMappingURL=animationUtils.js.map
