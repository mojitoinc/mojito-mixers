import React__default, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        this.props.onCatch && this.props.onCatch(error);
        console.log({ error, errorInfo });
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (React__default.createElement("div", null,
                React__default.createElement("h2", null, "Oops, there is an error!"),
                React__default.createElement("button", { type: "button", onClick: () => this.setState({ hasError: false }) }, "Try again?")));
        }
        // Return children components in case of no error
        return this.props.children;
    }
}

export { ErrorBoundary as default };
//# sourceMappingURL=ErrorBoundery.js.map
