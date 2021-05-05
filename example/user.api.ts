import * as ajax from '@ali/api-runtime/lib/request/ajax';
import { User as IUser } from './user.type';


declare class User {
  /**
   * @host https://mocks.alibaba-inc.com
   * @url /mock/api-loader/user.json
   * @spread user
   * @method post
   * @mock 1
   */
  // @ajax.willFetch((params) => {
  //   params.withCredentials = true;
  //   params.data = new FormData();
  //   params.data.append('a', '1');
  //   params.data.append('b', '2');
  //   params.headers = {'Content-Type':'multipart/form-data'}
  //   return params;
  // })
  @ajax.didFetch((data) => {
    console.log('didfetch', data);
    return Promise.reject({message: 'just error'})//data;
  })
  getUser(id: string, user: IUser | {}): Promise<IUser>;
}

export default new User;