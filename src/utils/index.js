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
 * 获取时间，带格式
 * @param {Object} params
 * @param {Number} params.timestamp - 时间戳，可传/不穿，默认为当前时间
 * @param {String} params.format - 获取的时间格式，注意中间以空格切分“日期”和“时间”
 *                               - yyyy-MM-dd HH:mm:ss
 *                               - yyyy-MM-dd
 *                               - ...自定义
 */
export function getDate ({
  timestamp = null,
  format = 'yyyy-MM-dd HH:mm:ss'
} = {}) {
  const addZero = (num, len = 2) => (`0${num}`).slice(-len)
  try {
    let formatDate = ''
    const date = timestamp ? new Date(timestamp) : new Date()
    const objData = {}
    objData.yyyy = date.getFullYear()
    objData.MM = addZero(date.getMonth() + 1)
    objData.dd = addZero(date.getDate())
    objData.HH = addZero(date.getHours())
    objData.mm = addZero(date.getMinutes())
    objData.ss = addZero(date.getSeconds())

    format.split(' ').forEach(time => {
      formatDate = formatDate.length ? formatDate + ' ' : formatDate
      // 匹配非英文字母
      const other = time.match(/[^A-Za-z]+/g)
      // 匹配非其他字符
      time.match(/[A-Za-z]+/g).forEach((str, key) => {
        formatDate += `${objData[str]}${other[key] || ''}`
      })
    })
    return formatDate
  } catch (e) {
    console.log(e)
  }
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

// 转 base64
export function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult = ''
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileResult = reader.result
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}
