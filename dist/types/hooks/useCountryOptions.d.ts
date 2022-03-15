import { SelectOption } from "../components/shared/Select/Select";
export declare function useCountryOptions(countryCode?: string | number): {
    options: SelectOption<string | number>[];
    optionsMap: Record<string, SelectOption<string | number>>;
};
