
export class MyMessage {
  constructor(
    public message?: string,
    public receiverId?: string,
    public senderId?: string,
    public senderName?: string,
  ) {
  }
}

export class SimpleMessage {
  constructor(
    public sender?: string,
    public receiver?: string,
    public  text?: string,
  ) {
  }
}
