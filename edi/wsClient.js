const WebSocket = require("ws")
const fs = require("fs")

const socket = new WebSocket("ws:localhost:8081") // Replace with the IP address of your machine

socket.on("open", () => {
  console.log("Connected to the server.")

  socket.on("message", (message) => {
    console.log("Received EDIFACT content from server.")
    fs.writeFileSync("received_files/received_edifact.edi", message)
    console.log("EDIFACT content saved as received_edifact.edi.")
    socket.close()
  })
})
