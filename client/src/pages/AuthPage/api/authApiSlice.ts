type UserData = {
  username: string;
  password: string;
};

class AuthApi {
  async register(userData: UserData) {
    const response = await fetch('http://localhost:5000/api/auth/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response;
  }

  async login(userData: UserData) {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response;
  }
}

export default new AuthApi();
