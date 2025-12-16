module.exports = function(io) {
    //io 관련 함수
    io.on("connection",async(socket)=> {
        console.log("client is connected",socket.id)
    })
    // io.emit() //말하기
    // io.on() //듣기
}