export const authService = {
  isLoggedIn: false,
  username: "",
  login(username) {
    this.isLoggedIn = true;
    this.username = username;
    console.log("is logged: ", this.isLoggedIn);

    console.log(username, "auth");
  },
  logout() {
    this.isLoggedIn = false;
    this.username = "";
  }
};
