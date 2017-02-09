import axios from 'axios';

const URL = 'https://challenge.acstechnologies.com/api/contact/';
const TOKEN = 'Yrbyr1QQy1iyitdRjNcf2SQSsGQYrcWlxnKMsfOg';

export function loadData() {
    let headers = { 'X-Auth-Token': TOKEN };

    return axios.get(URL, {
        headers: headers
    })
}

export function addItem(item) {
    let headers = { 'X-Auth-Token': TOKEN };

    return axios.post(URL, item, {
        headers: headers
    });
}

export function updateItem(id, item) {
    let url = `${URL}${id}`;
    let headers = { 'X-Auth-Token': TOKEN };

    return axios.put(url, item, {
        headers: headers
    });
}

export function deleteItem(id) {
    let url = `${URL}${id}`;
    let headers = { 'X-Auth-Token': TOKEN };

    return axios.delete(url, {
        headers: headers
    });
}

export function deleteItems(itemIds, thenFunction, catchFunction = null) {
    //clone array
    let items = itemIds.clone();

    //Make `this` available inside forEach
    // let _this = this;
    let requests = [];

    while (items.length > 0) {
        let itemId = items.shift();
        requests.push(deleteItem(itemId));
    }
    
    return axios.all(requests)
        .then(axios.spread(thenFunction))
        .catch(catchFunction);
}