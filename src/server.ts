// import app from './app';
// import config from './app/config';

// import mongoose from 'mongoose';

// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);

//     app.listen(config.port, () => {
//       console.log(`Example app listening on port ${config.port}`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// main();


// server.ts or index.ts
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const server = http.createServer(app);

// 🔌 Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // match frontend
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

// Export io globally
export { io };

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('joinRoom', (parcelId: string) => {
    socket.join(parcelId);
    console.log(`Joined parcel room: ${parcelId}`);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// ✅ Start Mongo and Express
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server.listen(config.port, () => {
      console.log(`🚀 Server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

