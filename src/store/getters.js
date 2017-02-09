/***************
 * Gets the current value of `view`, representing the current view of the application
 */
export const view = (state) => {
    return state.view;
}

/***************
 * Gets the currently selected item being viewed or edited
 */
export const selectedItem = (state) => {
    return state.selectedItem;
}

/***************
 * Gets an array of items currently selected in the table
 */
export const selectedItems = (state) => {
    return state.selectedItems;
}

/***************
 * Gets the current data set loaded form the API
 */
export const data = (state) => {
    return state.data;
}

/***************
 * Gets a set of properties related to each property in the data
 */
export const dataProperties = (state) => {
    return state.dataProperties;
}

/***************
 * Gets an empty data item, subtible for use when adding an item
 */
export const newItem = (state) => {
    //Create an empty object
    let item = {};

    //Add properties to the item
    for (let prop in state.dataProperties) {
        item[prop] = null;
    }

    return item;
}
