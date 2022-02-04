'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactUseCountryRegion = require('react-use-country-region');

var mapCountryToSelectOption = function (country) { return ({
    label: country.countryName,
    value: country.countryShortCode,
}); };
var mapRegionToSelectOption = function (region) { return ({
    label: region.name,
    value: region.shortCode,
}); };
var reduceSelectOptionsToMap = function (optionsMap, selectOption) {
    optionsMap[selectOption.value] = selectOption;
    return optionsMap;
};
function useCountryOptions(countryCode) {
    var _a = reactUseCountryRegion.useCountryRegion(countryCode), country = _a.result, getCountryList = _a.getCountryList;
    return React.useMemo(function () {
        // useCountryRegion seems to return null as the result (country) when countryCode changes. It takes an additional
        // render to get the right value, thus this check:
        if (countryCode === "" || (countryCode && !country))
            return { options: [], optionsMap: {} };
        var options = country
            ? country.regions.map(mapRegionToSelectOption)
            : getCountryList().map(mapCountryToSelectOption);
        var optionsMap = options.reduce(reduceSelectOptionsToMap, {});
        return { options: options, optionsMap: optionsMap };
        // getCountryList is not memoized. Adding it as a dependency makes this function always run, so we exclude it:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryCode, country]);
}

exports.useCountryOptions = useCountryOptions;
//# sourceMappingURL=useCountryOptions.js.map
