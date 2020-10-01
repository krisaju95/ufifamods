/**
 * This interface is used for every request made to toggle the loader
 * on or off.
 */
export interface AbcLoaderRequestConfig {
    /**
     * The showLoader property determines whether the loader should be visible.
     */
    showLoader: boolean;

    /**
     * The type property determines what type of predefined loader to display
     */
    type?: AbcLoaderType;
}

/**
 * This object is used when no loader config is available for displaying
 * the page loader
 */
export const defaultLoaderRequestConfig: AbcLoaderRequestConfig = {
    showLoader: false,
    type: "default"
}

/**
 * This type is used for better typing of the different configs for the page loader
 */
export type AbcLoaderType =
    "default" | "searchingForFlights" | "nextFlightAvailability" | "fareReview" |
    "seatSummary" | "seatSelection" | "passengerInformation" | "purchaseInformation";