import { SelectOption } from "../components/shared/Select/Select";
export declare function useCountryOptions(countryCode?: string | number): {
    options: SelectOption[];
    optionsMap: Record<string, SelectOption>;
};
