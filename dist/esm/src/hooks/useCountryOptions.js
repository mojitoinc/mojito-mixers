import { useMemo } from 'react';
import { useCountryRegion } from 'react-use-country-region';

const mapCountryToSelectOption = (country) => ({
    label: country.countryName,
    value: country.countryShortCode,
});
const mapRegionToSelectOption = (region) => ({
    label: region.name,
    value: region.shortCode,
});
const reduceSelectOptionsToMap = (optionsMap, selectOption) => {
    optionsMap[selectOption.value] = selectOption;
    return optionsMap;
};
const UNAVAILABLE_COUNTRIES = ["RU"];
const countryIsAvailable = (country) => !UNAVAILABLE_COUNTRIES.includes(country.countryShortCode);
function useCountryOptions(countryCode) {
    const { result: country, getCountryList } = useCountryRegion(countryCode);
    return useMemo(() => {
        // useCountryRegion seems to return null as the result (country) when countryCode changes. It takes an additional
        // render to get the right value, thus this check:
        if (countryCode === "" || (countryCode && !country))
            return { options: [], optionsMap: {} };
        const options = country
            ? country.regions.map(mapRegionToSelectOption)
            : getCountryList()
                .filter(countryIsAvailable)
                .map(mapCountryToSelectOption);
        const optionsMap = options.reduce(reduceSelectOptionsToMap, {});
        return { options, optionsMap };
        // getCountryList is not memoized. Adding it as a dependency makes this function always run, so we exclude it:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryCode, country]);
}

export { useCountryOptions };
//# sourceMappingURL=useCountryOptions.js.map
