let axios = require('axios')
module.exports = {
  token: null,
  init(url){
    let that = this
    axios.post(url,{
      username: 'admin',
      password: '123'
    }).then(res => {
      console.info(res.data)
      that.token = res.data.accessToken
    }).catch(res =>{
      console.info(res)
    })
  }
}