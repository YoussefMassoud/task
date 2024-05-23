import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getuser(): string []{
  return ['userOne', 'userTwo'];
}
getEditUser(): string []{

  return ['edit user one','edit u'];
}
}
