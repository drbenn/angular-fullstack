// const express = require("express");
// const { WebSocketServer, WebSocket } = require('ws')
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';


const app = express();


const port = process.env.port || 3000;

function onSocketPreError(e) {
    console.log(e);
}

function onSocketPostError(e) {
    console.log(e);
}

const server = app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

// each wss needs to be tied to a normal server
// setting no server allows entry to have steps for authorization, elsewise the plugin doesnt not give you the chance to insert aditional logic
const wss = new WebSocketServer({ noServer: true})

server.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketPreError);

    // perform auth here
    // 7:55 onwards for execellent intracacies
    // https://www.youtube.com/watch?v=Gq7fenbjehs
    if (!req.headers['BadAuth']) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(req, socket, head,(ws) => {
       socket.removeListener('error', onSocketPreError);
       wss.emit('connection', ws, req); 
    })
});

wss.on('connection', (ws, req) => {
   ws.on('error', onSocketPostError);

   ws.on('message', (msg, isBinary) => {
    // this wss.clients includes the client that is actually sending the message
    wss.clients.forEach((client) => {
        // this would send to everyone EXCEPT the person/client sending the message
        // if (ws !== client && client.readyState === WebSocket.OPEN) {

        // this would send to everyone INCLUDING the person/client sending the message
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg, { binary: isBinary });
        }
    });
   });

   ws.on('close', () => {
    console.log('Connection closed');
    // go to covalence youtube above...16:05 stale connections explanation
   })
})















// const express = require('express')
// const webserver = express()
//  .use((req, res) => {
//     // res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Add CORS header
//     res.setHeader('Access-Control-Allow-Origin', '*');
//    res.sendFile('/websocket-client.html', { root: __dirname })
//  }
// )
//  .listen(3000, () => console.log(`Listening on ${4200}`))
// const { WebSocketServer } = require('ws')

// const sockserver = new WebSocketServer({ port: 443 })

// sockserver.on('connection', ws => {
//  console.log('New client connected!')
//  ws.send('connection established')
//  ws.on('close', () => console.log('Client has disconnected!'))
//  ws.on('message', data => {
//    sockserver.clients.forEach(client => {
//      console.log(`distributing message: ${data}`)
//      client.send(`${data}`)
//    })
//  })
//  ws.onerror = function () {
//    console.log('websocket error')
//  }
// })

// sockserver.setHeader('Access-Control-Allow-Origin', '*');
// sockserver.setHeader()












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