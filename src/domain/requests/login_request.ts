export class LoginRequest {
  type = 'LOGIN_REQUEST';
  username = '';
  password = '';

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  toJson() {
    return {
      type: this.type,
      username: this.username,
      password: this.password
    };
  }
}
