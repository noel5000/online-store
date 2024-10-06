import { CacheService } from "./cacheService.ts";
import { HttpService } from "./httpService.ts";
import { IRegisterUser, LoginInfo, User } from "./model/user.ts";

export const userKey = "UserSystem$jnll23949@##%";
export class UserService {
  cache = new CacheService();
  http = new HttpService<any>("auth");

  getUser(): User {
    const user = this.cache.getData<User>(userKey);
    return user;
  }

  isUserLoggedIn(): boolean {
    const user = this.cache.getData<User>(userKey) ? true : false;
    return user;
  }

  addUser(user: User) {
    this.cache.addData(user, userKey);
  }
  logout() {
    this.cache.removeData(userKey);
    window.location.href = "/";
  }
  getToken(): string {
    const user = this.cache.getData<User>(userKey);
    return user?.authToken;
  }

  login(login: LoginInfo, from: string | null) {
    this.http.Post(login, "login").then((r) => {
      if (r.status < 0) alert(r.message);
      else {
        this.addUser(r.data as User);
        window.location.href = `${from ? "/" + from : "/"}`;
      }
    });
  }

  createUser(user: IRegisterUser, redirect?: string) {
    this.http.Post(user, "createuser").then((r) => {
      if (r.status < 0) alert(r.message);
      else {
        this.addUser(r.data as User);
        window.location.href = redirect ? `/${redirect}` : "/";
      }
    });
  }
}
