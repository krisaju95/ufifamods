/**
 * This is the set of resource keys used for various elements in
 * the components of this library. Ensure that you either replace the
 * keys with ones that you use in your project or to translate these
 * and add them to the translation loaders in your application.
 * 
 * I'd recommend creating a separate translation file just for these
 * keys so that it's easier to import with multiple translate loaders.
 * 
 * P.S. Talking about ngx-translate btw :)
 */
export const translations = {
    close: "abc.close_button.text",
    dialog: {
        start: "abc.start_of_dialog.sr.text",
        end: "abc.end_of_dialog.sr.text"
    },
    showPassword: "abc.show_password.sr.text",
    clearInput: "abc.clear_input.sr.text",
    dropdownSearchFilter: {
        placeholder: "abc.dropdown_search_filter.placeholder.text",
        noResultsFound: "abc.dropdown_search_filter.no_results_found.text"
    },
    loader: {
        pageHasLoadedScreenReaderText: "abc.page_has_loaded.text",
        defaultScreenReaderText: "abc.default_loading.text"
    }
}