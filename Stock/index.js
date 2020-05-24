var http = require('http')
var interval = 10000 // 设置请求间隔

// 代码： 深圳前加1， 上海前0， 如1002405,0600010
var stockCode = '1002405'

var urlPre = 'http://api.money.126.net/data/feed/'
var urlSub = ',money.api'
var url = urlPre + stockCode + urlSub // http://api.money.126.net/data/feed/1002405,money.api

var confuse = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus tempora illum qui? Maiores asperiores excepturi minus rem explicabo, molestiae, debitis et aspernatur dolorem reiciendis consequuntur. Temporibus nesciunt unde ratione consectetur!'

function getInfo(url) {
  var req = http.request(url, function (response) {
    if (response.statusCode == 200) {
      response.setEncoding('utf8')
      response.on('data', function (chunk) {
        var matchReg = /(?<=\().*?(?=\))/gi // 利用正则截取 ( )之间的内容
        var matchStr = chunk.match(matchReg)
        console.info(matchStr[0])

        var res = JSON.parse(matchStr[0])[stockCode]
        console.info(JSON.stringify({
          code: res.code,
          p: res.price,
          t: res.time
        }))
      })
    }
    console.info(confuse)
  })
  req.end()
}

function query () {
  getInfo(url)
  setTimeout(query, interval)
}
query()
