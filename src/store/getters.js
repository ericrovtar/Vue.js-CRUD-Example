export const view = (state) => {
    return state.view;
}

export const selectedItem = (state) => {
    return state.selectedItem;
}

export const selectedItems = (state) => {
    return state.selectedItems;
}

export const data = (state) => {
    return state.data;
}

export const dataProperties = (state) => {
    return state.dataProperties;
}

export const newItem = (state) => {
    //Create an empty object
    let item = {};

    //Add properties to the item
    for (let prop in state.dataProperties) {
        item[prop] = null;
    }

    return item;
}
