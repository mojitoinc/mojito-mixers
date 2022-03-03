'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

class ErrorBoundary extends React__default["default"].Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        const { onCatch } = this.props;
        if (!onCatch)
            console.error(error, errorInfo);
        const useConfirmModal = !onCatch || onCatch(error, errorInfo) === true;
        if (useConfirmModal) {
            const retry = window.confirm("Sorry, there was an unexpected error. Do you want to re-open the payment modal?");
            if (retry)
                this.setState({ hasError: false });
        }
    }
    render() {
        return this.state.hasError ? null : this.props.children;
    }
}

exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map
