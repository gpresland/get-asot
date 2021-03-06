/**
 * Pad left
 *
 * @param  {*}       value   The value to pad
 * @param  {Number}  length  The minimum length of the string to return
 * @param  {String}  char    The character to use for padding
 * @return {String}
 */
export const left = function (value: string | number, length: number, char: string | number): string {
  char = `${char}`;
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
export const right = function (value: string | number, length: number, char: string | number): string {
  char = `${char}`;
  return (value + char.repeat(length)).substr(0, length);
};

export default { left, right };
