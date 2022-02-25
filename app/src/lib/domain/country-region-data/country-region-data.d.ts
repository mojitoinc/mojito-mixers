declare module "country-region-data/dist/data-umd" {
  const _exported: {
    countryName: string;
    countryShortCode: string;
    regions: {
      name: string;
      shortCode: string;
    }[];
  }[];

  export default _exported;
}
