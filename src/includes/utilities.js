export function compareObjects(obj1, obj2, sortProperty) {
    if (obj1[sortProperty] === null || obj1[sortProperty] === undefined) {
        return -1;
    }
    else if (obj2[sortProperty] === null || obj2[sortProperty] === undefined){
        return 1;
    }
    else {
        //Compare based on type
        if (typeof obj1[sortProperty] === "string") {
            return obj1[sortProperty].localeCompare(obj2[sortProperty]);
        }
        else if (typeof obj1[sortProperty] === "number") {
            return obj1[sortProperty] > obj2[sortProperty];
        }
        else {
            //Try turning the item into a string
            return obj1[sortProperty].toString().localeCompare(obj2[sortProperty].toString());
        }
    }
}