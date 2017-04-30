/**
 * Pad
 *
 * Padding functions.
 *
 * @author    gPresland
 *
 */
'use strict';
/**
 * Pad left
 *
 * @param  {*}       value   The value to pad
 * @param  {Number}  length  The minimum length of the string to return
 * @param  {String}  char    The character to use for padding
 * @return {String}
 */
exports.left = function (value, length, char) {
    char = "" + char;
    return (char.repeat(length) + value).slice(-length);
};
/**
 * Pad right
 *
 * @param  {*}       value   The value to pad
 * @param  {Number}  length  The minimum length of the string to return
 * @param  {String}  char    The character to use for padding
 * @return {String}
 */
exports.right = function (value, length, char) {
    char = "" + char;
    return (value + char.repeat(length)).substr(0, length);
};
