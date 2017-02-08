import * as api from '../api';

export const loadData = ({ commit }) =>  {
    api.loadData()
        .then(function (response) {
            commit('loadData', { data: response.data });
            //_this.data = response.data;
        })
        .catch(function (error) {
            console.log('Request failed: ', error);
            // this.updateConfirmation(
            //     'error',
            //     `Oops! Something didn't go as expected. Please try again.`
            // );
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