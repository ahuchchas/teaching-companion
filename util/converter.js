export function arrayToObject(arr) {
  let obj = {};
  for (key in arr) {
    obj[key] = arr[key];
  }
  //console.log(obj);

  return obj;
}
export function objectToArray(obj) {
  let arr = [];
  for (key in obj) {
    arr[key] = obj[key];
  }
  //console.log(arr);

  return arr;
}
