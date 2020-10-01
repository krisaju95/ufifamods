/**
 * This attribute stores the prefix path and the format of the flag images used
 * in the phone number component
 */
export const abcFlagImage: any = {
    path: "/assets/images/flags/4x3/",
    format: ".svg"
};

/**
 * This interface is used when referencing the individual objects in the
 * phone number list
 */
export interface AbcCountryInfo {
    /**
     * This is the 2-digit ISO country code for the given dial code
     */
    code: string;

    /**
     * This is the digits that form the dial code for the given country
     */
    dialCode: string;

    /**
     * This an additional meta tag added for determining CA, AU and EU countries
     */
    addressType?: string;

    /**
     * This is the name of the country
     */
    name: string;

    /**
     * This parameter determines whether the area code is optional for a given country
     */
    areaCodeOptional?: string;
}

/**
 * This is the list of countries that needs to be displayed at the top
 * of the list irrespective of their position in the main list
 */
export const abcPrioritizedCountries: any[] = ["CA", "US"];

/**
 * This is the full list of countries with the country code, the dial
 * code and the name of the country
 */
export const abcPhoneNumberList: AbcCountryInfo[] = [
    {
        "code": "AF",
        "dialCode": "93",
        "addressType": "",
        "name": "Afghanistan"
    },
    {
        "code": "AL",
        "dialCode": "355",
        "addressType": "EU",
        "name": "Albania"
    },
    {
        "code": "DZ",
        "dialCode": "213",
        "addressType": "",
        "name": "Algeria"
    },
    {
        "code": "AS",
        "dialCode": "1-684",
        "addressType": "",
        "name": "American Samoa"
    },
    {
        "code": "AD",
        "dialCode": "376",
        "addressType": "EU",
        "name": "Andorra"
    },
    {
        "code": "AO",
        "dialCode": "244",
        "addressType": "",
        "name": "Angola"
    },
    {
        "code": "AI",
        "dialCode": "1-264",
        "addressType": "",
        "name": "Anguilla"
    },
    {
        "code": "AQ",
        "dialCode": "672",
        "addressType": "",
        "name": "Antarctica"
    },
    {
        "code": "AG",
        "dialCode": "1-268",
        "addressType": "",
        "name": "Antigua and Barbuda"
    },
    {
        "code": "AR",
        "dialCode": "54",
        "addressType": "",
        "name": "Argentina"
    },
    {
        "code": "AM",
        "dialCode": "374",
        "addressType": "EU",
        "name": "Armenia"
    },
    {
        "code": "AW",
        "dialCode": "297",
        "addressType": "",
        "name": "Aruba"
    },
    {
        "code": "AU",
        "dialCode": "61",
        "addressType": "AU",
        "name": "Australia"
    },
    {
        "code": "AT",
        "dialCode": "43",
        "addressType": "EU",
        "name": "Austria"
    },
    {
        "code": "AZ",
        "dialCode": "994",
        "addressType": "EU",
        "name": "Azerbaijan"
    },
    {
        "code": "BS",
        "dialCode": "1-242",
        "addressType": "",
        "name": "Bahamas"
    },
    {
        "code": "BH",
        "dialCode": "973",
        "addressType": "",
        "name": "Bahrain"
    },
    {
        "code": "BD",
        "dialCode": "880",
        "addressType": "",
        "name": "Bangladesh"
    },
    {
        "code": "BB",
        "dialCode": "1-246",
        "addressType": "",
        "name": "Barbados"
    },
    {
        "code": "BY",
        "dialCode": "375",
        "addressType": "EU",
        "name": "Belarus"
    },
    {
        "code": "BE",
        "dialCode": "32",
        "addressType": "EU",
        "name": "Belgium"
    },
    {
        "code": "BZ",
        "dialCode": "501",
        "addressType": "",
        "name": "Belize"
    },
    {
        "code": "BJ",
        "dialCode": "229",
        "addressType": "",
        "name": "Benin"
    },
    {
        "code": "BM",
        "dialCode": "1-441",
        "addressType": "",
        "name": "Bermuda"
    },
    {
        "code": "BT",
        "dialCode": "975",
        "addressType": "",
        "name": "Bhutan"
    },
    {
        "code": "BO",
        "dialCode": "591",
        "addressType": "",
        "name": "Bolivia"
    },
    {
        "code": "BA",
        "dialCode": "387",
        "addressType": "EU",
        "name": "Bosnia-Herzegovina"
    },
    {
        "code": "BW",
        "dialCode": "267",
        "addressType": "",
        "name": "Botswana"
    },
    {
        "code": "BV",
        "dialCode": "47",
        "addressType": "",
        "name": "Bouvet Islands"
    },
    {
        "code": "BR",
        "dialCode": "55",
        "addressType": "",
        "name": "Brazil"
    },
    {
        "code": "IO",
        "dialCode": "246",
        "addressType": "",
        "name": "British Indian Ocean Territory"
    },
    {
        "code": "VG",
        "dialCode": "1-284",
        "addressType": "",
        "name": "British Virgin Islands"
    },
    {
        "code": "BN",
        "dialCode": "673",
        "addressType": "",
        "name": "Brunei"
    },
    {
        "code": "BG",
        "dialCode": "359",
        "addressType": "EU",
        "name": "Bulgaria"
    },
    {
        "code": "BF",
        "dialCode": "226",
        "addressType": "",
        "name": "Burkina Faso"
    },
    {
        "code": "BI",
        "dialCode": "257",
        "addressType": "",
        "name": "Burundi"
    },
    {
        "code": "KH",
        "dialCode": "855",
        "addressType": "",
        "name": "Cambodia"
    },
    {
        "code": "CM",
        "dialCode": "237",
        "addressType": "",
        "name": "Cameroon"
    },
    {
        "code": "CA",
        "dialCode": "1",
        "addressType": "CA",
        "name": "Canada"
    },
    {
        "code": "CV",
        "dialCode": "238",
        "addressType": "",
        "name": "Cape Verde"
    },
    {
        "code": "KY",
        "dialCode": "1-345",
        "addressType": "",
        "name": "Cayman Islands"
    },
    {
        "code": "CF",
        "dialCode": "236",
        "addressType": "",
        "name": "Central African Republic"
    },
    {
        "code": "TD",
        "dialCode": "235",
        "addressType": "",
        "name": "Chad"
    },
    {
        "code": "CL",
        "dialCode": "56",
        "addressType": "",
        "name": "Chile"
    },
    {
        "code": "CN",
        "dialCode": "86",
        "addressType": "",
        "name": "China"
    },
    {
        "code": "CX",
        "dialCode": "61",
        "addressType": "",
        "name": "Christmas Island (Indian Ocean)"
    },
    {
        "code": "CC",
        "dialCode": "61",
        "addressType": "",
        "name": "Cocos (Keeling) Island"
    },
    {
        "code": "CO",
        "dialCode": "57",
        "addressType": "",
        "name": "Colombia"
    },
    {
        "code": "KM",
        "dialCode": "269",
        "addressType": "",
        "name": "Comoros"
    },
    {
        "code": "CG",
        "dialCode": "242",
        "addressType": "",
        "name": "Congo"
    },
    {
        "code": "CK",
        "dialCode": "682",
        "addressType": "",
        "name": "Cook Islands"
    },
    {
        "code": "CR",
        "dialCode": "506",
        "addressType": "",
        "name": "Costa Rica"
    },
    {
        "code": "HR",
        "dialCode": "385",
        "addressType": "EU",
        "name": "Croatia"
    },
    {
        "code": "CU",
        "dialCode": "53",
        "addressType": "",
        "name": "Cuba"
    },
    {
        "code": "CW",
        "dialCode": "599",
        "addressType": "",
        "name": "Curaçao"
    },
    {
        "code": "CY",
        "dialCode": "357",
        "addressType": "EU",
        "name": "Cyprus"
    },
    {
        "code": "CZ",
        "dialCode": "420",
        "addressType": "EU",
        "name": "Czech Republic"
    },
    {
        "code": "KP",
        "dialCode": "850",
        "addressType": "",
        "name": "Democratic People's Rep. (North Korea)"
    },
    {
        "code": "CD",
        "dialCode": "243",
        "addressType": "",
        "name": "Democratic Republic of Congo"
    },
    {
        "code": "DK",
        "dialCode": "45",
        "areaCodeOptional": "true",
        "addressType": "EU",
        "name": "Denmark"
    },
    {
        "code": "DJ",
        "dialCode": "253",
        "addressType": "",
        "name": "Djibouti"
    },
    {
        "code": "DM",
        "dialCode": "1-767",
        "addressType": "",
        "name": "Dominica"
    },
    {
        "code": "DO",
        "dialCode": "1-809",
        "addressType": "",
        "name": "Dominican Republic"
    },
    {
        "code": "EC",
        "dialCode": "593",
        "addressType": "",
        "name": "Ecuador"
    },
    {
        "code": "EG",
        "dialCode": "20",
        "addressType": "",
        "name": "Egypt"
    },
    {
        "code": "SV",
        "dialCode": "503",
        "addressType": "",
        "name": "El Salvador"
    },
    {
        "code": "GQ",
        "dialCode": "240",
        "addressType": "",
        "name": "Equatorial Guinea"
    },
    {
        "code": "ER",
        "dialCode": "291",
        "addressType": "",
        "name": "Eritrea"
    },
    {
        "code": "EE",
        "dialCode": "372",
        "addressType": "EU",
        "name": "Estonia"
    },
    {
        "code": "ET",
        "dialCode": "251",
        "addressType": "",
        "name": "Ethiopia"
    },
    {
        "code": "FK",
        "dialCode": "500",
        "addressType": "",
        "name": "Falklands Islands"
    },
    {
        "code": "FO",
        "dialCode": "298",
        "addressType": "",
        "name": "Faroe Islands"
    },
    {
        "code": "FJ",
        "dialCode": "679",
        "addressType": "",
        "name": "Fiji"
    },
    {
        "code": "FI",
        "dialCode": "358",
        "addressType": "EU",
        "name": "Finland"
    },
    {
        "code": "FR",
        "dialCode": "33",
        "addressType": "EU",
        "name": "France"
    },
    {
        "code": "GF",
        "dialCode": "594",
        "addressType": "",
        "name": "French Guyana"
    },
    {
        "code": "PF",
        "dialCode": "689",
        "addressType": "",
        "name": "French Polynesia"
    },
    {
        "code": "TF",
        "dialCode": "262",
        "addressType": "",
        "name": "French Southern Territories"
    },
    {
        "code": "GA",
        "dialCode": "241",
        "addressType": "",
        "name": "Gabon"
    },
    {
        "code": "GM",
        "dialCode": "220",
        "addressType": "",
        "name": "Gambia"
    },
    {
        "code": "GE",
        "dialCode": "995",
        "addressType": "EU",
        "name": "Georgia"
    },
    {
        "code": "DE",
        "dialCode": "49",
        "addressType": "EU",
        "name": "Germany"
    },
    {
        "code": "GH",
        "dialCode": "233",
        "addressType": "",
        "name": "Ghana"
    },
    {
        "code": "GI",
        "dialCode": "350",
        "addressType": "",
        "name": "Gibraltar"
    },
    {
        "code": "GR",
        "dialCode": "30",
        "addressType": "EU",
        "name": "Greece"
    },
    {
        "code": "GL",
        "dialCode": "299",
        "addressType": "",
        "name": "Greenland"
    },
    {
        "code": "GD",
        "dialCode": "1-473",
        "addressType": "",
        "name": "Grenada"
    },
    {
        "code": "GP",
        "dialCode": "590",
        "addressType": "",
        "name": "Guadeloupe"
    },
    {
        "code": "GU",
        "dialCode": "1-671",
        "addressType": "",
        "name": "Guam"
    },
    {
        "code": "GT",
        "dialCode": "502",
        "addressType": "",
        "name": "Guatemala"
    },
    {
        "code": "GN",
        "dialCode": "224",
        "addressType": "",
        "name": "Guinea"
    },
    {
        "code": "GW",
        "dialCode": "245",
        "addressType": "",
        "name": "Guinea Bissau"
    },
    {
        "code": "GY",
        "dialCode": "592",
        "addressType": "",
        "name": "Guyana"
    },
    {
        "code": "HT",
        "dialCode": "509",
        "addressType": "",
        "name": "Haiti"
    },
    {
        "code": "HM",
        "dialCode": "61",
        "addressType": "",
        "name": "Heard and Mcdonald Islands"
    },
    {
        "code": "HN",
        "dialCode": "504",
        "addressType": "",
        "name": "Honduras"
    },
    {
        "code": "HK",
        "dialCode": "852",
        "areaCodeOptional": "true",
        "addressType": "HK",
        "name": "Hong Kong SAR, China"
    },
    {
        "code": "HU",
        "dialCode": "36",
        "addressType": "EU",
        "name": "Hungary"
    },
    {
        "code": "IS",
        "dialCode": "354",
        "addressType": "EU",
        "name": "Iceland"
    },
    {
        "code": "IN",
        "dialCode": "91",
        "addressType": "",
        "name": "India"
    },
    {
        "code": "ID",
        "dialCode": "62",
        "addressType": "",
        "name": "Indonesia"
    },
    {
        "code": "IQ",
        "dialCode": "964",
        "addressType": "",
        "name": "Iraq"
    },
    {
        "code": "IE",
        "dialCode": "353",
        "addressType": "IR",
        "name": "Ireland"
    },
    {
        "code": "IR",
        "dialCode": "98",
        "addressType": "",
        "name": "Islamic Republic of Iran"
    },
    {
        "code": "IL",
        "dialCode": "972",
        "addressType": "",
        "name": "Israel"
    },
    {
        "code": "IT",
        "dialCode": "39",
        "addressType": "EU",
        "name": "Italy"
    },
    {
        "code": "CI",
        "dialCode": "225",
        "addressType": "",
        "name": "Ivory Coast"
    },
    {
        "code": "JM",
        "dialCode": "1-876",
        "addressType": "",
        "name": "Jamaica"
    },
    {
        "code": "JP",
        "dialCode": "81",
        "addressType": "",
        "name": "Japan"
    },
    {
        "code": "JO",
        "dialCode": "962",
        "addressType": "",
        "name": "Jordan"
    },
    {
        "code": "KZ",
        "dialCode": "7",
        "addressType": "EU",
        "name": "Kazakhstan"
    },
    {
        "code": "KE",
        "dialCode": "254",
        "addressType": "",
        "name": "Kenya"
    },
    {
        "code": "KI",
        "dialCode": "686",
        "addressType": "",
        "name": "Kiribati"
    },
    {
        "code": "KW",
        "dialCode": "965",
        "addressType": "",
        "name": "Kuwait"
    },
    {
        "code": "KG",
        "dialCode": "996",
        "addressType": "",
        "name": "Kyrgyzstan"
    },
    {
        "code": "LA",
        "dialCode": "856",
        "addressType": "",
        "name": "Laos"
    },
    {
        "code": "LV",
        "dialCode": "371",
        "addressType": "EU",
        "name": "Latvia"
    },
    {
        "code": "LB",
        "dialCode": "961",
        "addressType": "",
        "name": "Lebanon"
    },
    {
        "code": "LS",
        "dialCode": "266",
        "addressType": "",
        "name": "Lesotho"
    },
    {
        "code": "LR",
        "dialCode": "231",
        "addressType": "",
        "name": "Liberia"
    },
    {
        "code": "LY",
        "dialCode": "218",
        "addressType": "",
        "name": "Libya"
    },
    {
        "code": "LI",
        "dialCode": "423",
        "addressType": "EU",
        "name": "Liechtenstein"
    },
    {
        "code": "LT",
        "dialCode": "370",
        "addressType": "EU",
        "name": "Lithuania"
    },
    {
        "code": "LU",
        "dialCode": "352",
        "addressType": "EU",
        "name": "Luxembourg"
    },
    {
        "code": "MO",
        "dialCode": "853",
        "addressType": "",
        "name": "Macau SAR, China"
    },
    {
        "code": "MK",
        "dialCode": "389",
        "addressType": "EU",
        "name": "Macedonia"
    },
    {
        "code": "MG",
        "dialCode": "261",
        "addressType": "",
        "name": "Madagascar"
    },
    {
        "code": "MW",
        "dialCode": "265",
        "addressType": "",
        "name": "Malawi"
    },
    {
        "code": "MY",
        "dialCode": "60",
        "addressType": "",
        "name": "Malaysia"
    },
    {
        "code": "MV",
        "dialCode": "960",
        "addressType": "",
        "name": "Maldives"
    },
    {
        "code": "ML",
        "dialCode": "223",
        "addressType": "",
        "name": "Mali"
    },
    {
        "code": "MT",
        "dialCode": "356",
        "addressType": "EU",
        "name": "Malta"
    },
    {
        "code": "MH",
        "dialCode": "692",
        "addressType": "",
        "name": "Marshall Islands"
    },
    {
        "code": "MQ",
        "dialCode": "596",
        "addressType": "",
        "name": "Martinique"
    },
    {
        "code": "MR",
        "dialCode": "222",
        "addressType": "",
        "name": "Mauritania"
    },
    {
        "code": "MU",
        "dialCode": "230",
        "addressType": "",
        "name": "Mauritius"
    },
    {
        "code": "YT",
        "dialCode": "269",
        "addressType": "",
        "name": "Mayotte"
    },
    {
        "code": "MX",
        "dialCode": "52",
        "addressType": "",
        "name": "Mexico"
    },
    {
        "code": "FM",
        "dialCode": "691",
        "addressType": "",
        "name": "Micronesia"
    },
    {
        "code": "MD",
        "dialCode": "373",
        "addressType": "EU",
        "name": "Moldova"
    },
    {
        "code": "MC",
        "dialCode": "377",
        "addressType": "EU",
        "name": "Monaco"
    },
    {
        "code": "MN",
        "dialCode": "976",
        "addressType": "",
        "name": "Mongolia"
    },
    {
        "code": "MS",
        "dialCode": "1-664",
        "addressType": "",
        "name": "Montserrat"
    },
    {
        "code": "MA",
        "dialCode": "212",
        "addressType": "",
        "name": "Morocco"
    },
    {
        "code": "MZ",
        "dialCode": "258",
        "addressType": "",
        "name": "Mozambique"
    },
    {
        "code": "MM",
        "dialCode": "95",
        "addressType": "",
        "name": "Myanmar"
    },
    {
        "code": "NA",
        "dialCode": "264",
        "addressType": "",
        "name": "Namibia"
    },
    {
        "code": "NR",
        "dialCode": "674",
        "addressType": "",
        "name": "Nauru"
    },
    {
        "code": "NP",
        "dialCode": "977",
        "addressType": "",
        "name": "Nepal"
    },
    {
        "code": "NL",
        "dialCode": "31",
        "addressType": "EU",
        "name": "Netherlands"
    },
    {
        "code": "NC",
        "dialCode": "687",
        "addressType": "",
        "name": "New Caledonia"
    },
    {
        "code": "NZ",
        "dialCode": "64",
        "addressType": "",
        "name": "New Zealand"
    },
    {
        "code": "NI",
        "dialCode": "505",
        "addressType": "",
        "name": "Nicaragua"
    },
    {
        "code": "NE",
        "dialCode": "227",
        "addressType": "",
        "name": "Niger"
    },
    {
        "code": "NG",
        "dialCode": "234",
        "addressType": "",
        "name": "Nigeria"
    },
    {
        "code": "NU",
        "dialCode": "683",
        "addressType": "",
        "name": "Niue"
    },
    {
        "code": "NF",
        "dialCode": "672",
        "addressType": "",
        "name": "Norfolk Island"
    },
    {
        "code": "MP",
        "dialCode": "1-670",
        "addressType": "",
        "name": "Northern Mariana Islands"
    },
    {
        "code": "NO",
        "dialCode": "47",
        "areaCodeOptional": "true",
        "addressType": "EU",
        "name": "Norway"
    },
    {
        "code": "OM",
        "dialCode": "968",
        "addressType": "",
        "name": "Oman"
    },
    {
        "code": "PK",
        "dialCode": "92",
        "addressType": "",
        "name": "Pakistan"
    },
    {
        "code": "PW",
        "dialCode": "680",
        "addressType": "",
        "name": "Palau"
    },
    {
        "code": "PA",
        "dialCode": "507",
        "addressType": "",
        "name": "Panama"
    },
    {
        "code": "PG",
        "dialCode": "675",
        "addressType": "",
        "name": "Papua New Guinea"
    },
    {
        "code": "PY",
        "dialCode": "595",
        "addressType": "",
        "name": "Paraguay"
    },
    {
        "code": "PE",
        "dialCode": "51",
        "addressType": "",
        "name": "Peru"
    },
    {
        "code": "PH",
        "dialCode": "63",
        "addressType": "",
        "name": "Philippines"
    },
    {
        "code": "PN",
        "dialCode": "64",
        "addressType": "",
        "name": "Pitcairn Island"
    },
    {
        "code": "PL",
        "dialCode": "48",
        "addressType": "EU",
        "name": "Poland"
    },
    {
        "code": "PT",
        "dialCode": "351",
        "addressType": "EU",
        "name": "Portugal"
    },
    {
        "code": "PR",
        "dialCode": "1-787 or 1-939",
        "addressType": "",
        "name": "Puerto Rico"
    },
    {
        "code": "QA",
        "dialCode": "974",
        "addressType": "",
        "name": "Qatar"
    },
    {
        "code": "KR",
        "dialCode": "82",
        "addressType": "",
        "name": "Republic of Korea (South Korea)"
    },
    {
        "code": "RE",
        "dialCode": "262",
        "addressType": "",
        "name": "Reunion Island"
    },
    {
        "code": "RO",
        "dialCode": "40",
        "addressType": "EU",
        "name": "Romania"
    },
    {
        "code": "RU",
        "dialCode": "7",
        "addressType": "EU",
        "name": "Russia"
    },
    {
        "code": "RW",
        "dialCode": "250",
        "addressType": "",
        "name": "Rwanda"
    },
    {
        "code": "LC",
        "dialCode": "1-758",
        "addressType": "",
        "name": "Saint Lucia"
    },
    {
        "code": "WS",
        "dialCode": "685",
        "addressType": "",
        "name": "Samoa"
    },
    {
        "code": "SM",
        "dialCode": "378",
        "addressType": "EU",
        "name": "San Marino"
    },
    {
        "code": "ST",
        "dialCode": "239",
        "addressType": "",
        "name": "Sao Tome and Principe"
    },
    {
        "code": "SA",
        "dialCode": "966",
        "addressType": "",
        "name": "Saudi Arabia"
    },
    {
        "code": "SN",
        "dialCode": "221",
        "addressType": "",
        "name": "Senegal"
    },
    {
        "code": "SC",
        "dialCode": "248",
        "addressType": "",
        "name": "Seychelles"
    },
    {
        "code": "SL",
        "dialCode": "232",
        "addressType": "",
        "name": "Sierra Leone"
    },
    {
        "code": "SG",
        "dialCode": "65",
        "addressType": "",
        "name": "Singapore"
    },
    {
        "code": "SK",
        "dialCode": "421",
        "addressType": "EU",
        "name": "Slovakia"
    },
    {
        "code": "SI",
        "dialCode": "386",
        "addressType": "EU",
        "name": "Slovenia"
    },
    {
        "code": "SB",
        "dialCode": "677",
        "addressType": "",
        "name": "Solomon Islands"
    },
    {
        "code": "SO",
        "dialCode": "252",
        "addressType": "",
        "name": "Somalia"
    },
    {
        "code": "ZA",
        "dialCode": "27",
        "addressType": "",
        "name": "South Africa"
    },
    {
        "code": "GS",
        "dialCode": "500",
        "addressType": "",
        "name": "South Georgia & Sandwich Islands"
    },
    {
        "code": "ES",
        "dialCode": "34",
        "addressType": "EU",
        "name": "Spain and Canary Islands"
    },
    {
        "code": "LK",
        "dialCode": "94",
        "addressType": "",
        "name": "Sri Lanka"
    },
    {
        "code": "SH",
        "dialCode": "290",
        "addressType": "",
        "name": "St. Helena"
    },
    {
        "code": "KN",
        "dialCode": "1-869",
        "addressType": "",
        "name": "St. Kitts and Nevis"
    },
    {
        "code": "PM",
        "dialCode": "508",
        "addressType": "",
        "name": "St. Pierre and Miquelon"
    },
    {
        "code": "VC",
        "dialCode": "1-784",
        "addressType": "",
        "name": "St. Vincent and the Grenadines"
    },
    {
        "code": "SD",
        "dialCode": "249",
        "addressType": "",
        "name": "Sudan"
    },
    {
        "code": "SR",
        "dialCode": "597",
        "addressType": "",
        "name": "Suriname"
    },
    {
        "code": "SJ",
        "dialCode": "47",
        "addressType": "",
        "name": "Svalbard & Jan Mayen Island"
    },
    {
        "code": "SZ",
        "dialCode": "268",
        "addressType": "",
        "name": "Swaziland"
    },
    {
        "code": "SE",
        "dialCode": "46",
        "addressType": "EU",
        "name": "Sweden"
    },
    {
        "code": "CH",
        "dialCode": "41",
        "addressType": "EU",
        "name": "Switzerland"
    },
    {
        "code": "SY",
        "dialCode": "963",
        "addressType": "",
        "name": "Syrian Arab Republic"
    },
    {
        "code": "TW",
        "dialCode": "886",
        "addressType": "",
        "name": "Taiwan, China"
    },
    {
        "code": "TJ",
        "dialCode": "992",
        "addressType": "",
        "name": "Tajikistan"
    },
    {
        "code": "TZ",
        "dialCode": "255",
        "addressType": "",
        "name": "Tanzania"
    },
    {
        "code": "TH",
        "dialCode": "66",
        "addressType": "",
        "name": "Thailand"
    },
    {
        "code": "TG",
        "dialCode": "228",
        "addressType": "",
        "name": "Togo"
    },
    {
        "code": "TK",
        "dialCode": "690",
        "addressType": "",
        "name": "Tokelau"
    },
    {
        "code": "TO",
        "dialCode": "676",
        "addressType": "",
        "name": "Tonga"
    },
    {
        "code": "TT",
        "dialCode": "1-868",
        "addressType": "",
        "name": "Trinidad and Tobago"
    },
    {
        "code": "TN",
        "dialCode": "216",
        "addressType": "",
        "name": "Tunisia"
    },
    {
        "code": "TR",
        "dialCode": "90",
        "addressType": "EU",
        "name": "Turkey"
    },
    {
        "code": "TM",
        "dialCode": "993",
        "addressType": "",
        "name": "Turkmenistan"
    },
    {
        "code": "TC",
        "dialCode": "1-649",
        "addressType": "",
        "name": "Turks and Caicos Islands"
    },
    {
        "code": "TV",
        "dialCode": "688",
        "addressType": "",
        "name": "Tuvalu"
    },
    {
        "code": "VI",
        "dialCode": "1-340",
        "addressType": "",
        "name": "U.S. Virgin Islands"
    },
    {
        "code": "UG",
        "dialCode": "256",
        "addressType": "",
        "name": "Uganda"
    },
    {
        "code": "UA",
        "dialCode": "380",
        "addressType": "EU",
        "name": "Ukraine"
    },
    {
        "code": "AE",
        "dialCode": "971",
        "addressType": "",
        "name": "United Arab Emirates"
    },
    {
        "code": "GB",
        "dialCode": "44",
        "addressType": "UK",
        "name": "United Kingdom"
    },
    {
        "code": "US",
        "dialCode": "1",
        "addressType": "US",
        "name": "United States"
    },
    {
        "code": "UM",
        "dialCode": "699",
        "addressType": "",
        "name": "United States Minor Outlying Islands"
    },
    {
        "code": "UY",
        "dialCode": "598",
        "addressType": "",
        "name": "Uruguay"
    },
    {
        "code": "UZ",
        "dialCode": "998",
        "addressType": "",
        "name": "Uzbekistan"
    },
    {
        "code": "VU",
        "dialCode": "678",
        "addressType": "",
        "name": "Vanuatu"
    },
    {
        "code": "VA",
        "dialCode": "379",
        "addressType": "EU",
        "name": "Vatican City State"
    },
    {
        "code": "VE",
        "dialCode": "58",
        "addressType": "",
        "name": "Venezuela"
    },
    {
        "code": "VN",
        "dialCode": "84",
        "addressType": "",
        "name": "Vietnam"
    },
    {
        "code": "WF",
        "dialCode": "681",
        "addressType": "",
        "name": "Wallis and Futuna Islands"
    },
    {
        "code": "EH",
        "dialCode": "212",
        "addressType": "",
        "name": "Western Sahara"
    },
    {
        "code": "YE",
        "dialCode": "967",
        "addressType": "",
        "name": "Yemen"
    },
    {
        "code": "ZM",
        "dialCode": "260",
        "addressType": "",
        "name": "Zambia"
    },
    {
        "code": "ZW",
        "dialCode": "263",
        "addressType": "",
        "name": "Zimbabwe"
    }
];