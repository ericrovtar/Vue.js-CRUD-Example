import * as api from '../api';
import * as types from './mutation-types';

/***************
 * Loads data from the API
 * 
 * data:  the data to load
 * then:  the function to call after the data is successfully loaded
 * catch: the function to call if there is an error when loading the data
 */
export const loadData = ({ commit }, payload) =>  {
    let _payload = payload;

    api.loadData()
        .then(function (response) {
            commit(types.LOAD_DATA, { data: response.data });

            if (_payload.hasOwnProperty('then')) {
                _payload.then(response);
            }
        })
        .catch(function (error) {
            console.log('Request failed: ', error);

            if (_payload.hasOwnProperty('catch')) {
                _payload.catch(error);
            }
        });
};

/***************
 * Adds or removes the item form the `selectedItems` array
 * 
 * itemId:  id of the item
 */
export const toggleSelectedItem = ({ commit, state }, payload) => {
    //See if id exists in `selectedItems`
    let i = state.selectedItems.indexOf(payload.itemId);
    
    if (i >= 0) {
        //Remove it
        commit(types.REMOVE_SELECTED_ITEM, { itemId: payload.itemId });
    }
    else {
        //Add it
        commit(types.ADD_SELECTED_ITEM, { itemId: payload.itemId });
    }
}