
/**
  * @desc Set item or weapon
*/

const setItem = (data, type, char, item) => {
  // Set basic player info
  data.player[type][char] = item

  return data
}

export { setItem }
