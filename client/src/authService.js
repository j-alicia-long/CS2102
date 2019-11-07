import jwtDecode from "jwt-decode";

export const authService = {
  login(token) {
    localStorage.setItem("token", token.token);
    const decoded = jwtDecode(token.token);
    this.username = decoded.user;
  },
  logout() {
    localStorage.removeItem("token");
    this.username = "";
  },
  loggedIn() {
    return localStorage.getItem("token") !== null;
  },
  getUsername() {
    // TODO: get user to return user object
    const token = localStorage.getItem("token");
    if (!token) {
      return "";
    }
    console.log("local storage token: ", token);
    const decoded = jwtDecode(token);
    return decoded.user;
  }
};
