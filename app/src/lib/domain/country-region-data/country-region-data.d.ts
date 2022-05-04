declare module "country-region-data/dist/data-umd" {
  const exported: {
    countryName: string;
    countryShortCode: string;
    regions: {
      name: string;
      shortCode: string;
    }[];
  }[];

  export default exported;
}
