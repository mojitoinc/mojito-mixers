let circleCountries;
let optionsCountries;
let notInCircleList;
let notInOptions;
let countries;
let notInCircleExclusions;
let exclusions;


// INSTRUCTIONS
// 1. Uncomment the line `(window as any).countries = getCountryList();` in `useCountryOptions.ts`.
// 2. Run the app.
// 3. Go to the BillingView step.
// 4. Open DevTools.
// 5. Select all the code below this comment and paste it in the console.
// 6. Make sure there are no mismatches between the two lists due a country being named differently. If so, update the
//    `spice`s block below until you don't have any mismatches.
// 7. Run one more time.
// 8. Copy `UNAVAILABLE_COUNTRIES` and paste it in `useCountryOptions.ts`.


// Country selector lib:

optionsCountries = countries.map(({ countryName }) => countryName.toLowerCase().replace(/^the /, ""));


// Circle:
// See https://developers.circle.com/docs/supported-countries.

circleCountries = ["Åland Islands", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "the Plurinational State of Bolivia", "Bonaire", "Sint Eustatius and Saba", "Bosnia and Herzegovina", "Bouvet Island", "Brazil", "the British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Canada", "the Cayman Islands", "Chad", "Chile", "China", "Christmas Island", "the Cocos (Keeling) Islands", "Colombia", "the Comoros", "the Congo", "the Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Curaçao", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "the Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "the Falkland (Islas Malvinas)", "the Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "the French Southern Territories", "Gabon", "the Gambia", "Georgia", "Germany", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guyana", "Haiti", "Heard Island and McDonald Islands", "the Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Isle of Man", "Israel", "Italy", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "the Republic of Korea", "Kuwait", "Kyrgyzstan", "the Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Malta", "the Marshall Islands", "Martinique", "Mauritania", "Mayotte", "Mexico", "the Federated States of Micronesia", "the Republic of Moldova", "Monaco", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "the Netherlands", "New Caledonia", "New Zealand", "the Niger", "Nigeria", "Niue", "the Norfolk Island", "the Northern Mariana Islands", "Norway", "Oman", "Palau", "The State of Palestine", "Papua New Guinea", "Paraguay", "Peru", "the Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Réunion", "Romania", "the Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena", "Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "the United Republic of Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Tunisia", "Turkey", "Turkmenistan", "the Turks and Caicos Islands", "Tuvalu", "the United Arab Emirates", "the United Kingdom of Great Britain and Northern Ireland", "the United States Minor Outlying Islands", "the United States of America", "Uruguay", "Uzbekistan", "Viet Nam", "Virgin Islands (British)", "Wallis and Futuna", "Western Sahara", "Zambia"]

circleCountries = circleCountries.map(countryName => countryName.toLowerCase().replace(/^the /, ""));

circleCountries.splice(circleCountries.indexOf("plurinational state of bolivia"), 1, "bolivia");
circleCountries.splice(circleCountries.indexOf("bonaire"), 1, "bonaire, sint eustatius and saba");
circleCountries.splice(circleCountries.indexOf("sint eustatius and saba"), 1, "bonaire, sint eustatius and saba");
circleCountries.splice(circleCountries.indexOf("cabo verde"), 1, "cape verde");
circleCountries.splice(circleCountries.indexOf("congo"), 1, "congo, republic of the (brazzaville)", "congo, the democratic republic of the (kinshasa)"); // !
circleCountries.splice(circleCountries.indexOf("côte d'ivoire"), 1, "côte d'ivoire, republic of");
circleCountries.splice(circleCountries.indexOf("czechia"), 1, "czech republic");
circleCountries.splice(circleCountries.indexOf("eswatini"), 1, "swaziland"); // swaziland is the former name
circleCountries.splice(circleCountries.indexOf("falkland (islas malvinas)"), 1, "falkland islands (islas malvinas)");
circleCountries.splice(circleCountries.indexOf("french southern territories"), 1, "french southern and antarctic lands");
circleCountries.splice(circleCountries.indexOf("gambia"), 1, "gambia, the");
circleCountries.splice(circleCountries.indexOf("holy see"), 1, "holy see (vatican city)");
circleCountries.splice(circleCountries.indexOf("republic of korea"), 1, "korea, republic of"); // !
circleCountries.splice(circleCountries.indexOf("lao people's democratic republic"), 1, "laos");
circleCountries.splice(circleCountries.indexOf("federated states of micronesia"), 1, "micronesia, federated states of");
circleCountries.splice(circleCountries.indexOf("republic of moldova"), 1, "moldova");
circleCountries.splice(circleCountries.indexOf("state of palestine"), 1, "palestine, state of");
circleCountries.splice(circleCountries.indexOf("republic of north macedonia"), 1, "macedonia, republic of");
circleCountries.splice(circleCountries.indexOf("saint helena"), 1, "saint helena, ascension and tristan da cunha"); // !
circleCountries.splice(circleCountries.indexOf("ascension and tristan da cunha"), 1, "saint helena, ascension and tristan da cunha"); // !
circleCountries.splice(circleCountries.indexOf("saint martin (french part)"), 1, "saint martin");
circleCountries.splice(circleCountries.indexOf("south georgia and the south sandwich islands"), 1, "south georgia and south sandwich islands");
circleCountries.splice(circleCountries.indexOf("svalbard and jan mayen"), 1, "norway"); // They are under Norway's jurisdiction, so in the country selector it appears as a state.
circleCountries.splice(circleCountries.indexOf("united republic of tanzania"), 1, "tanzania, united republic of");
circleCountries.splice(circleCountries.indexOf("united kingdom of great britain and northern ireland"), 1, "united kingdom");
circleCountries.splice(circleCountries.indexOf("united states of america"), 1, "united states");
circleCountries.splice(circleCountries.indexOf("viet nam"), 1, "vietnam");
circleCountries.splice(circleCountries.indexOf("virgin islands (british)"), 1, "virgin islands, british");


notInCircleList = [];

optionsCountries.forEach((optionCountry) => {
    if (!circleCountries.includes(optionCountry)) notInCircleList.push(optionCountry);
});


notInOptions = [];

circleCountries.forEach((circleCountry) => {
    if (!optionsCountries.includes(circleCountry)) notInOptions.push(circleCountry);
});

if (notInOptions.length > 0) {
  console.log("\n\nCircle supports the following countries that are not in the countries list. Please, make sure it's not a name mismatch: ", notInOptions);
}

if (notInCircleList.length > 0) {
  console.log("\n\nCountries not supported by Circle that should be excluded: ", notInCircleList);

} else {
  console.log("\n\nAll countries in the list are supported by Circle!");
}

console.log("");
console.log("");

notInCircleExclusions = notInCircleList.map((optionCountry) => {
  const match = countries.find(({ countryName }) => countryName.toLowerCase().replace(/^the /, "") === optionCountry);

  if (!match) {
    console.log(`Could not find a match for "${ optionCountry }".`);

    return "";
  }

  return match.countryShortCode;
}).filter(Boolean);

exclusions = [...new Set(["RU", ...notInCircleExclusions])].sort();

console.log(`const UNAVAILABLE_COUNTRIES = [${ exclusions.map(exclusion => `"${ exclusion }"`).join(", ")}]`)
