var user = {
  name: 'xcvu',
  age: 27,
  gender: 'female'
}

console.info(user)

for (const key in user) {
  if (user.hasOwnProperty(key)) {
    const value = user[key]
    console.info(key + ': ' + value)
  }
}

const arr = ['xcyh', 'xcli', 'xcvu']

for (const key in arr) {
  if (arr.hasOwnProperty(key)) {
    const value = arr[key]
    console.info(key + ': ' + value)
  }
}

for (const iterator of arr) {
  console.info(iterator)
}

arr.forEach(function (item) {
  console.info('value:' + item)
})
const newArr = arr.map(function (item) {
  return item + ' haha'
})
console.table(newArr)
