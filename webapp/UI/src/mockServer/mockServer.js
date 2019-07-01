import UserService from "./services/userService";

class MockServer {
  constructor() {
    this.services = [];
    this.services.user = UserService;
  }

  getService(serviceName) {
    return this.services[serviceName];
  }
}

export default new MockServer();
