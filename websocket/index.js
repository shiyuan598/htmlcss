var ws = require('nodejs-websocket');

console.info('start connect...')

var server = ws.createServer(function(conn){
  conn.on('text', function(data){
    console.info('recived:' + data)
    broadcast(data)
  })

  conn.on('close', function(code, reason){
    console.info('close')
  })

  conn.on('error', function(code, reason){
    console.info('error')
  })
  
}).listen(8002)

console.info('connect ok')

// 广播消息
function broadcast(data){
  server.connections.forEach((conn)=>{
    conn.sendText(data)
  })
}
