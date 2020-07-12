var user = {
  name: 'xcvu',
  age: 27,
  gender: 'female'
}

console.info(user)

for (const key in user) {
  if (user.hasOwnProperty(key)) {
    const value = user[key];
    console.info(key + ': ' + value)
  }
}

for (const iterator of user) {
  console.info(iterator)
}