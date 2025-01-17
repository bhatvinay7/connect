async function filter(originalArray){
let uniqueArray = originalArray.reduce((accumulator, item) => {
    if (!accumulator.includes(item)) {
        accumulator.push(item);
    }
    return accumulator;
}, []);
   return uniqueArray;
 
}
export {filter}
