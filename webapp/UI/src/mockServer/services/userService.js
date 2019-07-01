class UserService {
  register(data) {
    let $deferred = $.Deferred();
    localStorage.setItem(data.username, JSON.stringify(data));
    $deferred.resolve();
    return $deferred.promise();
  }

  login(data) {
    let $deferred = $.Deferred();
    let savedUserString = localStorage.getItem(data.username);
    let savedUser = JSON.parse(savedUserString);
    let session = {};

    if (!savedUserString) {
      $deferred.reject("Error: user does not exist");
    } else if (data.password !== savedUser.password) {
      $deferred.reject("Error: username and password do not match!");
    } else {
      session.user = this.filterUserData(savedUser);
      session.id = Math.random()
        .toString(36)
        .slice(-8);

      $deferred.resolve(session);
    }
    return $deferred.promise();
  }

  filterUserData(user) {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username
    };
  }
}

export default new UserService();
