declare module 'country-region-data/data.json' {
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
