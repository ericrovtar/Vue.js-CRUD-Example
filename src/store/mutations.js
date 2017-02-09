import * as types from './mutation-types';
import { compareObjects } from '../includes/utilities';

export const mutations = {
    /***************
     * Changes the currently value of `view`
     * 
     * view: the current view of the application
     */
    changeView(state, payload) {
        state.view = payload.view;
    },

    /***************
     * Changes the currently selected item
     * 
     * item: the item to be set as currently selected
     */
    changeSelectedItem(state, payload) {
        //Check if we have an `item` or `itemId`
        if (payload.hasOwnProperty('item')) {
            state.selectedItem = payload.item;
        }
        else if (payload.hasOwnProperty('itemId')) {
            //Make `itemId` available in `find`
            let _itemId = payload.itemId;
                    
            state.selectedItem = state.data.data.find(function (item) {
                return item.id === _itemId;
            });
        }
    },

    /***************
     * Changes the value of a property in `dataProperties`
     * 
     * key:   the key of the property to change
     * value: the value to change it to
     */
    changeDataProperty(state, payload) {
        state.dataProperties[payload.key].showDefault = payload.value;
    },

    /***************
     * Loads the data from the API into the application
     * 
     * data: the updated set of data
     */
    [types.LOAD_DATA] (state, payload) {
        state.data = payload.data;
    },

    /***************
     * Sorts the data based on a property and direction
     * 
     * sortProperty: the property to sort by
     * sortOrder:    the order to sort by ('asc' or 'desc')
     */
    sortData(state, payload) {
        if (state.data.data !== undefined) {
            state.data.data.sort(function(obj1, obj2) {
                //Check for sort order
                if (payload.sortOrder === 'asc') {
                    return compareObjects(obj1, obj2, payload.sortProperty);
                }
                else {
                    return compareObjects(obj2, obj1, payload.sortProperty);
                }
            });
        }
    },

    /***************
     * Adds the id of an item to the selected items array
     * 
     * itemId: id of the item to add
     */
    [types.ADD_SELECTED_ITEM] (state, payload) {
        state.selectedItems.push(payload.itemId)
    },

    /***************
     * Removes the id of an item for the selected items array
     * 
     * itemId: id of the item to remove
     */
    [types.REMOVE_SELECTED_ITEM] (state, payload) {
        let i = state.selectedItems.indexOf(payload.itemId);
        state.selectedItems.splice(i, 1);
    },

    /***************
     * Removes all items from the selected items array
     */
    clearSelectedItems(state) {
        //Clear out array
        state.selectedItems = [];

        /***
         * NOTE: 
         * =====
         * I am unable to determine why, but the preferred method to empty the array
         *     `state.selectedItems.length = 0`
         * does not work in this instance. I can only assume it has to do with the
         * way Vue tracks the values and state of items. Further investigation is 
         * required, but this solution works in our current application.
         */
    }
}