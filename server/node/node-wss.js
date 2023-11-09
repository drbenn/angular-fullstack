const express = require('express')
const webserver = express()
 .use((req, res) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Add CORS header
    res.setHeader('Access-Control-Allow-Origin', '*');
   res.sendFile('/websocket-client.html', { root: __dirname })
 }
)
 .listen(3000, () => console.log(`Listening on ${3000}`))
const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 443 })
sockserver.on('connection', ws => {
 console.log('New client connected!')
 ws.send('connection established')
 ws.on('close', () => console.log('Client has disconnected!'))
 ws.on('message', data => {
   sockserver.clients.forEach(client => {
     console.log(`distributing message: ${data}`)
     client.send(`${data}`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})












// const express = require("express");
// const cors = require('cors');
// // const { WebSocketServer } = require('ws') // node native websocket, socket.io is also alternative

// // Express setup
// const app = express();
// app.use(cors());

// const webserver = app.use((req, res) => {
//     console.log(req);   
//     res.setHeader('Access-Control-Allow-Origin', '*');
//    res.sendFile('/websocket-client.html', { root: __dirname })
// }
//    )   
//    .listen(3000, () => console.log(`Listening on ${3000}`))
//         const { WebSocketServer } = require('ws')
//         const sockserver = new WebSocketServer({ port: 443 })
//         sockserver.on('connection', ws => {
//         console.log('New client connected!')
//         ws.send('connection established')
//         ws.on('close', () => console.log('Client has disconnected!'))
//         ws.on('message', data => {
//             sockserver.clients.forEach(client => {
//             console.log(`distributing message: ${data}`)
//             client.send(`${data}`)
//             })
//     })
//     ws.onerror = function () {
//         console.log('websocket error')
//     }
//  })

 // wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (data) => {
//     const message = JSON.parse(data);
//     console.log('Received message:', message);

//     const broadcastMessage = {
//       type: 'message',
//       message: message
//     };

//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(JSON.stringify(broadcastMessage));
//       }
//     });
//   });
// });


// const wss = new WebSocket.Server({ app });


// WebSocket Chat
// The front-end Angular application sends a POST request to the /chat endpoint, but the Node.js server does not have an explicit route for handling this POST request. Instead, the Node.js server uses the native WebSocket API to listen for connections and handle incoming messages, regardless of the HTTP method used by the client.

// This approach is commonly used for WebSocket applications because WebSockets provide a persistent bidirectional communication channel between the client and the server, allowing for real-time data exchange. HTTP requests, on the other hand, are short-lived and unidirectional, making them less suitable for real-time communication.

// In this context, the POST request sent by the front-end Angular application serves as a way to initiate a WebSocket connection with the Node.js server. The Node.js server, upon receiving the POST request, upgrades the connection to a WebSocket and starts handling incoming messages using the WebSocket API.

// So, while there is no explicit route for handling the POST request itself, the Node.js server utilizes the underlying WebSocket connection established as a result of the POST request to receive and process messages.
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (data) => {
//     const message = JSON.parse(data);
//     console.log('Received message:', message);

//     const broadcastMessage = {
//       type: 'message',
//       message: message
//     };

//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(JSON.stringify(broadcastMessage));
//       }
//     });
//   });
// });