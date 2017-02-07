/**
 * Checks if the string is empty, whitespace or null
 */
String.prototype.isNullOrWhitespace = function () {
    var str = this;

    return this === '' || this === null;
}

/**
 * Checks if the string is empty, whitespace or null
 * 
 * str: String to check
 */
String.isNullOrWhitespace = function(str) {
    return str.isNullOrWhitespace();
}