import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000/");

function connect(cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  socket.on("chat", message => {
    // console.log the message for posterity
    console.log(message);
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  });
}

function ping_time(cb){
    socket.on("ping_time", data => {
        cb(data);
    })
}
export { connect, ping_time };