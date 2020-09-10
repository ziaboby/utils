/**
 * Takes two or more arrays and returns an array of the symmetric difference of the provided arrays
 * This code was created after lodash 'xor' function  
 * 
 * @param {array} arrays - list of arrays
 * @return {array}
 */
export default function (arrays) {
    const mergedArray = (arrays.length == 2 && [...arrays[0], ...arrays[1]]) || [].concat(...arrays), finalArray = [];
    for (let i = 0; i < mergedArray.length; i++) {
        if (
            mergedArray.indexOf(mergedArray[i]) ==
            mergedArray.lastIndexOf(mergedArray[i])
        ) {
            finalArray.push(mergedArray[i]);
        }
    }
    return finalArray;
};
