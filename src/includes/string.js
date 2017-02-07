/**
 * Checks if the string is empty, whitespace or null
 */
String.prototype.isNullOrWhitespace = function () {
    try {
        var str = this.toString();

        return this === '' || this === null;
    }
    catch(err) {
        return false;
    }
}

/**
 * Checks if the string is empty, whitespace or null
 * 
 * str: String to check
 */
String.isNullOrWhitespace = function(str) {
    if (str === null) {
        return true;
    }
    
    return str.toString().isNullOrWhitespace();
}