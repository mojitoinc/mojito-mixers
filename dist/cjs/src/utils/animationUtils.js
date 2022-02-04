'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');

var shakeAnimation = material.keyframes(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["\n  0% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }\n  10% { transform: translate(calc(var(--multiplier, 1) * 1px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }\n  20% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -3deg)); }\n  30% { transform: translate(calc(var(--multiplier, 1) * 3px), 0) rotate(calc(var(--multiplier, 1) * 2deg)); }\n  40% { transform: translate(calc(var(--multiplier, 1) * -1px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }\n  50% { transform: translate(calc(var(--multiplier, 1) * 3px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }\n  60% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -1deg)); }\n  70% { transform: translate(calc(var(--multiplier, 1) * 1px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }\n  80% { transform: translate(calc(var(--multiplier, 1) * -2px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }\n  90% { transform: translate(2px, 0) rotate(2deg); }\n  100% { transform: translate(0, 0) rotate(0); }\n"], ["\n  0% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }\n  10% { transform: translate(calc(var(--multiplier, 1) * 1px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }\n  20% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -3deg)); }\n  30% { transform: translate(calc(var(--multiplier, 1) * 3px), 0) rotate(calc(var(--multiplier, 1) * 2deg)); }\n  40% { transform: translate(calc(var(--multiplier, 1) * -1px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }\n  50% { transform: translate(calc(var(--multiplier, 1) * 3px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }\n  60% { transform: translate(calc(var(--multiplier, 1) * -3px), 0) rotate(calc(var(--multiplier, 1) * -1deg)); }\n  70% { transform: translate(calc(var(--multiplier, 1) * 1px), 0) rotate(calc(var(--multiplier, 1) * 3deg)); }\n  80% { transform: translate(calc(var(--multiplier, 1) * -2px), 0) rotate(calc(var(--multiplier, 1) * -2deg)); }\n  90% { transform: translate(2px, 0) rotate(2deg); }\n  100% { transform: translate(0, 0) rotate(0); }\n"])));
function useShakeAnimation(element) {
    var _a = React.useState({
        shakeCount: 0,
        blip: false,
    }), _b = _a[0], shakeCount = _b.shakeCount, blip = _b.blip, setShakeSate = _a[1];
    var isShaking = shakeCount > 0;
    var incrementCount = React.useCallback(function () {
        setShakeSate(function (prevShakeSate) { return ({ shakeCount: prevShakeSate.shakeCount + 1, blip: false }); });
    }, []);
    var resetCount = React.useCallback(function () {
        setShakeSate({ shakeCount: 0, blip: false });
    }, []);
    React.useEffect(function () {
        if (!element)
            return;
        if (isShaking) {
            element.addEventListener("animationend", resetCount);
        }
        else {
            element.removeEventListener("animationend", resetCount);
        }
    }, [resetCount, element, isShaking]);
    var shake = React.useCallback(function () {
        if (!element)
            return;
        if (isShaking) {
            setShakeSate(function (prevShakeSate) { return ({ shakeCount: prevShakeSate.shakeCount, blip: true }); });
            setTimeout(incrementCount);
            return;
        }
        incrementCount();
    }, [element, incrementCount, isShaking]);
    var multiplier = Math.min(1 + 2 * (shakeCount - 1) / 10, 3);
    return [isShaking && !blip ? {
            "--multiplier": multiplier,
            animation: "".concat(shakeAnimation, " 1s linear normal"),
        } : {}, shake];
}
var templateObject_1;

exports.useShakeAnimation = useShakeAnimation;
//# sourceMappingURL=animationUtils.js.map
