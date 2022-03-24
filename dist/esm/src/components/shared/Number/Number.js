import React__default from 'react';

const Number = ({ as: Wrapper = "span", children, prefix = "", suffix = "" }) => {
    const numberFormat = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return (React__default.createElement(Wrapper, null, `${prefix}${numberFormat.format(children).replace(/[.,']00$/, "")}${suffix}`));
};

export { Number };
//# sourceMappingURL=Number.js.map
