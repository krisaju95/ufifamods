/**
 * This object is used to configure the default header and footer
 * keys for the different types of loaders. The onCompletion key
 * is a screen reader key that is announced after the loader is toggled
 * off
 */
export const abcPageLoaderConfig: any = {
    default: {
        header: "",
        footer: "",
        onCompletion: ""
    },
    searchingForFlights: {
        header: "abc.searching_for_flights.header.text",
        footer: "abc.searching_for_flights.footer.text",
        onCompletion: ""
    },
    nextFlightAvailability: {
        header: "abc.loading_your_next_flight.header.text",
        footer: "",
        onCompletion: ""
    },
    fareReview: {
        header: "abc.loading_fare_review.header.text",
        footer: "abc.loading_fare_review.footer.text",
        onCompletion: ""
    },
    seatSummary: {
        header: "abc.loading_seat_summary.header.text",
        footer: "abc.loading_seat_summary.footer.text",
        onCompletion: ""
    },
    seatSelection: {
        header: "abc.loading_seat_selection.header.text",
        footer: "abc.loading_seat_selection.footer.text",
        onCompletion: ""
    },
    passengerInformation: {
        header: "abc.loading_passenger_page.header.text",
        footer: "abc.loading_passenger_page.footer.text",
        onCompletion: ""
    },
    purchaseInformation: {
        header: "abc.loading_purchase_page.header.text",
        footer: "abc.loading_purchase_page.footer.text",
        onCompletion: ""
    }
};