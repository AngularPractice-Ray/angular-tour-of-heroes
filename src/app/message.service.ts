import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  // 新增訊息
  add(message: string) {
    this.messages.push(message);
  }

  // 清除
  clear() {
    this.messages = [];
  }
}
