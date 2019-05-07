import React from "react";
import ReactDOM from "react-dom";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

var element = <h1>Subscribe to Pewdiepie!</h1>;
ReactDOM.render(element, document.getElementById("root"));

socket.on("ping_time", data => {
  element += "<h1> ping </h1>";
  ReactDOM.render(element, document.getElementById("root"));
});
