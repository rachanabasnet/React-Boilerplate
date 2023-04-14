import Http from "./Http";

const http = new Http();

export default class UserServices {

  static createUser(args: any) {
    return http.post<any>({
      endpoint: `/user/`,
      payload: args,
    });
  }

  static patchUser(args: any, username: string) {
    return http.patch<any>({
      endpoint: `/user/${username}/`,
      payload: args,
    });
  }


  static getUser(username: any) {
    return http.get<any>({
      endpoint: `/user/${username}/`,
    });
  }

  static getUsers(filter: any) {
    return http.get<any>({
      endpoint: `/user`,
      payload: { params: filter },
    });
  }
}
