import * as api from '../api';

export const loadData = ({ commit }, payload) =>  {
    api.loadData()
        .then(function (response) {
            commit('loadData', { data: response.data });

            if (payload.hasOwnProperty('then')) {
                payload.then(response);
            }
        })
        .catch(function (error) {
            console.log('Request failed: ', error);

            if (payload.hasOwnProperty('catch')) {
                payload.catch(error);
            }
        });
};

export const toggleSelectedItem = ({ commit, state }, payload) => {
    //See if id exists in `selectedItems`
    let i = state.selectedItems.indexOf(payload.itemId);
    
    if (i >= 0) {
        //Remove it
        commit('removeSelectedItem', { itemId: payload.itemId });
    }
    else {
        //Add it
        commit('addSelectedItem', { itemId: payload.itemId });
    }
}