let id = 1
// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export function generateID () {
  return id++
}
export function getLastestMonth () {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  if (month === 0) {
    month = 12
    year -= 1
  }
  month = month > 9 ? month : `0${month}`
  return `${year}${month}`
}
