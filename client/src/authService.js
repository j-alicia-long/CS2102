import jwtDecode from "jwt-decode";

export const authService = {
  login(token) {
    localStorage.setItem("token", token.token);
    const decoded = jwtDecode(token.token);
    console.log(decoded);
  },
  logout() {
    localStorage.removeItem("token");
  },
  loggedIn() {
    return localStorage.getItem("token") !== null;
  },
  getUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      return "";
    }
    const decoded = jwtDecode(token);
    return decoded;
  },
  getUsername() {
    const token = localStorage.getItem("token");
    if (!token) {
      return "";
    }
    const decoded = jwtDecode(token);
    return decoded.uid;
  }
};
