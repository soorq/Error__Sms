import { Injectable } from '@nestjs/common';
import { SMSRu } from 'node-sms-ru';

@Injectable()
export class AppService {
  constructor(private readonly sms: SMSRu) {}

  async getHello() {
    console.log(this.sms);
    return await this.sms.sendSms({ to: '312312', msg: '23112' }); //Example
  }
}
