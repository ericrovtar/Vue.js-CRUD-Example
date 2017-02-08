import { compareObjects } from '../includes/utilities';

export const mutations = {
    changeView(state, payload) {
        console.log("Mutation: changeView called");
        console.log(payload.view);

        state.view = payload.view;
    },
    changeSelectedItem(state, payload) {
        console.log("Mutation: changeSelectedItem called");

        //Check if we have an `item` or `itemId`
        if (payload.hasOwnProperty('item')) {
            console.log(payload.item);

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
        console.log("Mutation: changeDataProperty called");
        console.log(payload.key);
        console.log(payload.value);      

        state.dataProperties[payload.key].showDefault = payload.value;
    },
    loadData(state, payload) {
        console.log("Mutation: loadData called");
        console.log(payload);

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
    addSelectedItem(state, payload) {
        state.selectedItems.push(payload.itemId)
    },
    removeSelectedItem(state, payload) {
        let i = state.selectedItems.indexOf(payload.itemId);
        state.selectedItems.splice(i, 1);
    },
    clearSelectedItems(state) {
        //Clear out array
        state.selectedItems = [];
    }
}