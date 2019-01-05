export class Person {
  constructor(
    public name?: string,
    public age?: number
  ) {
  }
}

export class MyMessage {
  constructor(
    public message?: string,
    public receiverId?: string,
    public senderId?: string,
    public senderName?: string,
  ) {
  }
}
