import React__default from 'react';

const Number = ({ as: Wrapper = "span", children, prefix = "", suffix = "" }) => {
    const numberFormat = new Intl.NumberFormat();
    return (React__default.createElement(Wrapper, null, `${prefix}${numberFormat.format(children)}${suffix}`));
};

export { Number };
//# sourceMappingURL=Number.js.map
