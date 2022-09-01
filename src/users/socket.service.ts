import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";

@Injectable()
export class SocketService {
  private io: Server;

  constructor() {
    this.io = new Server(3123, {
      // options
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
      },
    });
  }

  launchDropAnimation(pseudo, cards) {
    this.io.emit("notif", { pseudo: pseudo, cards: cards });
  }
}
