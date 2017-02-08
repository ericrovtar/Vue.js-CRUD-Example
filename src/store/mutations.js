import * as types from './mutation-types';
import { compareObjects } from '../includes/utilities';

export const mutations = {
    changeView(state, payload) {
        state.view = payload.view;
    },
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
    changeDataProperty(state, payload) {
        state.dataProperties[payload.key].showDefault = payload.value;
    },
    [types.LOAD_DATA] (state, payload) {
        state.data = payload.data;
    },
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
    [types.ADD_SELECTED_ITEM] (state, payload) {
        state.selectedItems.push(payload.itemId)
    },
    [types.REMOVE_SELECTED_ITEM] (state, payload) {
        let i = state.selectedItems.indexOf(payload.itemId);
        state.selectedItems.splice(i, 1);
    },
    clearSelectedItems(state) {
        //Clear out array
        state.selectedItems = [];
    }
}