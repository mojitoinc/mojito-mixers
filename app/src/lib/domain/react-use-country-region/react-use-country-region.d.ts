declare module "react-use-country-region" {
  export function useCountryRegion(countryCode?: string | number): {
    result?: {
      countryName: string;
      countryShortCode: string;
      regions: {
        name: string;
        shortCode: string;
      }[];
    };
    getCountryList: () => {
      countryName: string;
      countryShortCode: string;
    }[];
  };
}
