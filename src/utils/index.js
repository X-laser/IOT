/**
 * 扁平化树形ID，找出属于该ID的一组数据
 * @param {Array} array - 操作的数组
 * @param {String} id - 想筛选出某级ID
 * @param {Boolean} act - 第一次递归标识符，不用传
 * @param {Array} reArr - 最后筛选出来的值，不用传
 */
export function flatChildrenId (array, id, key = id, name = key, children = 'children', act = true, reArr = [], find = false) {
  for (let i = 0; i < array.length; i++) {
    // 递归先把树形分类扁平化
    const e = array[i]
    if (e[key] === id) {
      find = true
      reArr.push(e[name])
      break
    }
    if (Array.isArray(e[children])) {
      const rc = flatChildrenId(e[children], id, key, name, children, false, reArr, find)
      find = rc.find
      reArr = rc.reArr
      if (find) {
        reArr.unshift(e[name])
        break
      }
    }
  }
  // 最终筛选出符合条件的一组
  if (act) return reArr.length ? reArr : [id]
  return {
    find,
    reArr
  }
}

/**
 * 获取当前时间
 * @param {String} timestamp - 时间戳
 */

export function getDate (timestamp = null) {
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  let date = ''
  date = timestamp ? new Date(timestamp) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [h, m, s].map(formatNumber).join(':')
}

// 深拷贝
export function deepCopy (obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
