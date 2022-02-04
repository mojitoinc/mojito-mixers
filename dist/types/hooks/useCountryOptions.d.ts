import { SelectOption } from "../components/shared/Select/Select";
export declare function useCountryOptions(countryCode?: string): {
    options: SelectOption[];
    optionsMap: Record<string, SelectOption>;
};
