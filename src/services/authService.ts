export const authService = {
  login: async (email: string, password: string) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const token = "mock-jwt-token-" + Date.now();
          localStorage.setItem("jwt_token", token);
          resolve({ token });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  },
  register: async (data: any) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password) {
          const token = "mock-jwt-token-" + Date.now();
          localStorage.setItem("jwt_token", token);
          resolve({ token });
        } else {
          reject(new Error("Invalid data"));
        }
      }, 800);
    });
  },
  logout: () => {
    localStorage.removeItem("jwt_token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("jwt_token");
  }
};
