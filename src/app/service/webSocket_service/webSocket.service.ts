import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket: WebSocket | undefined;
  public ticketUpdates: number = 0;

  constructor() {
    this.connect();
  }

  private connect() {
    this.webSocket = new WebSocket('ws://localhost:8080/tickets');

    this.webSocket.onmessage = (event) => {
      this.ticketUpdates = parseInt(event.data, 10);
    };
  }
}
