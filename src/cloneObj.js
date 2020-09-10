/**
 * Optimized function the clone an object without references, based on Sportsbook common use.
 * This code was created after lodash 'clone' function  
 * 
 * @param {object} obj - object to be cloned
 * @return {object}
 */
export default function cloneObj(obj) {
    if (obj && 'object' == typeof obj) {
        const objKeys = Object.keys(obj),
            length = objKeys.length;
        if (Array.isArray(obj) && obj.length == length) {
            // obj.length != Object.keys(obj).length when objects are wrongly initialized as Array
            if (length && obj[0] && 'object' == typeof obj[0]) {
                // case: list of objects
                const clonedArray = [];
                for (let i = 0; i < length; i++) {
                    clonedArray.push(cloneObj(obj[i]));
                }
                return clonedArray;
            } else {
                return [...obj];
            }
        } else if (length) {
            const clonedObj = {};
            for (let i = 0; i < length; i++) {
                clonedObj[objKeys[i]] = cloneObj(obj[objKeys[i]]);
            }
            return clonedObj;
        } else if (length == 0) {
            obj = {};
        }
    }
    return obj;
};
