
/**
 * Getter object value in case of dynamic or unknown content.
 * When path structure is known, please use the following practice instead 
 * https://blog.osteele.com/2007/12/cheap-monads/
 * 
 * This code was created after lodash 'get' function 
 * 
 * @param {object} obj
 * @param {string|array|function} path - property path
 * @param {number} [levelsToSkip=0] - specify the number of path props to skip in reverse order
 *                                    (eg. when levelsToSkip is set to 1, function returns the parent of the specified path)
 * @param {object|array|string|number} [fallback=null] - what to return in the case nothing is found
 * @return {object|array|string|number} Return prop value, 'null' when nothing is found
 * @example
 *      const object = {
 *          a: {a:[0,1]}, b: 2, c: 3, d: { a: { b: { c: { d : 1 } } } }
 *      };
 *      ((((object || {}).d || {}).a || {}).c || {}).d || null      // 1 with 'The Maybe Monad'
 *      get(object, "d.a.b.c.d")                                    // 1 - string
 *      get(object, ["d", "a", "b", "c", "d"])                      // 1 - array
 *      get(object, _ => _.d.a.b.c.d)                               // 1 - function
 *      get(object, _ => _.d.a.b.c.f.d)                             // null - function
 *
 */
export default function (obj, path, levelsToSkip, fallback = null) {
    levelsToSkip = levelsToSkip || 0;
    let res;
    try {
        if ('function' === typeof path) {
            res = path(obj);
        } else {
            const props = (Array.isArray(path) && path) || ('' + path).split('.'),
                getValue = (obj, prop) => {
                    return obj[prop];
                };
            if (props.length === 1) {
                res = obj[props[0]];
            } else {
                for (let i = 0; i < props.length - levelsToSkip; i++) {
                    res = getValue(res || obj, props[i]);
                }
            }
        }
    } catch (e) {
        // missing value led to bad performance
        console.log(path.toString() + ' failed with object ' + JSON.stringify(obj), e);
    }
    return res || fallback;
};
