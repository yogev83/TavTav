class User {
  constructor(userData) {
    if (userData) {
      this.populate(userData);
    }
  }

  populate(userData) {
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.userName = userData.userName;
    this.email = userData.email;
  }
}

export default User;
