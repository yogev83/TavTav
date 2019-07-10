/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Utils {
  getTemplate(htmlName) {
    let $getTemplate = $.get(tavtav.templatesPath + htmlName + ".html");
    return $.when($getTemplate);
  }

  hideOverlay() {
    let $overlay = $($(".overlay")[0]);
    $overlay.hide();
  }

  showOverlay() {
    let $overlay = $($(".overlay")[0]);
    $overlay.show();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new Utils());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FormFieldValidation {
  constructor(isValid = true, error = "") {
    this.isValid = isValid;
    this.error = error;
  }

  setValidStatus(isValid) {
    this.isValid = isValid;
  }

  setError(error) {
    this.error = error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FormFieldValidation);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_userService__ = __webpack_require__(11);


class MockServer {
  constructor() {
    this.services = [];
    this.services.user = __WEBPACK_IMPORTED_MODULE_0__services_userService__["a" /* default */];
  }

  getService(serviceName) {
    return this.services[serviceName];
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (new MockServer());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_dialog_dialog__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_form_form__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils__ = __webpack_require__(0);




class FormDialogModule {
  constructor() {
    this.dialog = null;
    this.form = null;
    this.$container = $("#main");
    this.okPressed = false;

    this.formOptions = this.formOptions || {};
  }

  create(handler) {
    this.handler = handler;
    this.dialog = new __WEBPACK_IMPORTED_MODULE_0__common_dialog_dialog__["a" /* default */](
      this.onAction.bind(this),
      this.onClose.bind(this),
      this.dialogOptions
    );

    this.form = new __WEBPACK_IMPORTED_MODULE_1__common_form_form__["a" /* default */](this.formTemplate, this.formOptions);

    return this.dialog.create(this.$container).then(() => {
      __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].showOverlay();
      return this.form.create(this.dialog.getContent()).then(() => {
        $($(this.dialog.getContent()).find("input")[0]).focus();
      });
    });
  }

  onAction() {
    let data;
    let valid = this.form.validate();
    if (!valid) {
      return;
    }

    data = this.form.getData();
    this.action(data);
    // .then(response => {
    //   console.warn(response);
    //   this.close();
    // })
    // .fail(error => {
    //   this.form.showError(error);
    // });
  }

  close() {
    this.dialog.close();
  }

  onClose() {
    delete this.dialog;
    __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].hideOverlay();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FormDialogModule);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basicStringValidators__ = __webpack_require__(14);


class FormFieldValidators extends __WEBPACK_IMPORTED_MODULE_0__basicStringValidators__["a" /* default */] {
  static get consts() {
    return {
      NAME_MAX_LENGTH: 16,
      PASSWORD_MIN_LENGTH: 6,
      PASSWORD_MAX_LENGTH: 12
    };
  }

  username(username) {
    let validation = this.startsWithLetter(username);
    if (validation.isValid) {
      validation = this.alphaNumeric(username);
    }
    return validation;
  }

  name(name) {
    let validation = this.onlyLetters(name);
    if (validation.isValid) {
      validation = this.maxLength(
        name,
        FormFieldValidators.consts.NAME_MAX_LENGTH
      );
    }
    return validation;
  }

  password(password) {
    let validation = this.alphaNumeric(password);
    if (validation.isValid) {
      validation = this.lengthBetween(
        password,
        FormFieldValidators.consts.PASSWORD_MIN_LENGTH,
        FormFieldValidators.consts.PASSWORD_MAX_LENGTH
      );
    }
    return validation;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new FormFieldValidators());


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _microApiClient = __webpack_require__(6);

var _microApiClient2 = _interopRequireDefault(_microApiClient);

var _user = __webpack_require__(16);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTPRegexp = /^http:\/\//;
var defaultApiURL = "/.netlify/identity";

var GoTrue = function () {
  function GoTrue() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$APIUrl = _ref.APIUrl,
        APIUrl = _ref$APIUrl === undefined ? defaultApiURL : _ref$APIUrl,
        _ref$audience = _ref.audience,
        audience = _ref$audience === undefined ? "" : _ref$audience,
        _ref$setCookie = _ref.setCookie,
        setCookie = _ref$setCookie === undefined ? false : _ref$setCookie;

    _classCallCheck(this, GoTrue);

    if (APIUrl.match(HTTPRegexp)) {
      console.warn("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely.");
    }

    if (audience) {
      this.audience = audience;
    }

    this.setCookie = setCookie;

    this.api = new _microApiClient2.default(APIUrl);
  }

  _createClass(GoTrue, [{
    key: "_request",
    value: function _request(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options.headers = options.headers || {};
      var aud = options.audience || this.audience;
      if (aud) {
        options.headers["X-JWT-AUD"] = aud;
      }
      return this.api.request(path, options).catch(function (err) {
        if (err instanceof _microApiClient.JSONHTTPError && err.json) {
          if (err.json.msg) {
            err.message = err.json.msg;
          } else if (err.json.error) {
            err.message = err.json.error + ": " + err.json.error_description;
          }
        }
        return Promise.reject(err);
      });
    }
  }, {
    key: "settings",
    value: function settings() {
      return this._request("/settings");
    }
  }, {
    key: "signup",
    value: function signup(email, password, data) {
      return this._request("/signup", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password, data: data })
      });
    }
  }, {
    key: "login",
    value: function login(email, password, remember) {
      var _this = this;

      this._setRememberHeaders(remember);
      return this._request("/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=password&username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password)
      }).then(function (response) {
        _user2.default.removeSavedSession();
        return _this.createUser(response, remember);
      });
    }
  }, {
    key: "loginExternalUrl",
    value: function loginExternalUrl(provider) {
      return this.api.apiURL + "/authorize?provider=" + provider;
    }
  }, {
    key: "confirm",
    value: function confirm(token, remember) {
      this._setRememberHeaders(remember);
      return this.verify("signup", token, remember);
    }
  }, {
    key: "requestPasswordRecovery",
    value: function requestPasswordRecovery(email) {
      return this._request("/recover", {
        method: "POST",
        body: JSON.stringify({ email: email })
      });
    }
  }, {
    key: "recover",
    value: function recover(token, remember) {
      this._setRememberHeaders(remember);
      return this.verify("recovery", token, remember);
    }
  }, {
    key: "acceptInvite",
    value: function acceptInvite(token, password, remember) {
      var _this2 = this;

      this._setRememberHeaders(remember);
      return this._request("/verify", {
        method: "POST",
        body: JSON.stringify({ token: token, password: password, type: "signup" })
      }).then(function (response) {
        return _this2.createUser(response, remember);
      });
    }
  }, {
    key: "acceptInviteExternalUrl",
    value: function acceptInviteExternalUrl(provider, token) {
      return this.api.apiURL + "/authorize?provider=" + provider + "&invite_token=" + token;
    }
  }, {
    key: "createUser",
    value: function createUser(tokenResponse) {
      var remember = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._setRememberHeaders(remember);
      var user = new _user2.default(this.api, tokenResponse, this.audience);
      return user.getUserData().then(function (user) {
        if (remember) {
          user._saveSession();
        }
        return user;
      });
    }
  }, {
    key: "currentUser",
    value: function currentUser() {
      var user = _user2.default.recoverSession(this.api);
      user && this._setRememberHeaders(user._fromStorage);
      return user;
    }
  }, {
    key: "verify",
    value: function verify(type, token, remember) {
      var _this3 = this;

      this._setRememberHeaders(remember);
      return this._request("/verify", {
        method: "POST",
        body: JSON.stringify({ token: token, type: type })
      }).then(function (response) {
        return _this3.createUser(response, remember);
      });
    }
  }, {
    key: "_setRememberHeaders",
    value: function _setRememberHeaders(remember) {
      if (this.setCookie) {
        this.api.defaultHeaders = this.api.defaultHeaders || {};
        this.api.defaultHeaders["X-Use-Cookie"] = remember ? "1" : "session";
      }
    }
  }]);

  return GoTrue;
}();

exports.default = GoTrue;


if (typeof window !== "undefined") {
  window.GoTrue = GoTrue;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONHTTPError = exports.TextHTTPError = exports.HTTPError = exports.getPagination = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pagination = __webpack_require__(15);

Object.defineProperty(exports, "getPagination", {
  enumerable: true,
  get: function get() {
    return _pagination.getPagination;
  }
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var HTTPError = exports.HTTPError = function (_extendableBuiltin2) {
  _inherits(HTTPError, _extendableBuiltin2);

  function HTTPError(response) {
    _classCallCheck(this, HTTPError);

    var _this = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, response.statusText));

    _this.name = _this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(response.statusText).stack;
    }
    _this.status = response.status;
    return _this;
  }

  return HTTPError;
}(_extendableBuiltin(Error));

var TextHTTPError = exports.TextHTTPError = function (_HTTPError) {
  _inherits(TextHTTPError, _HTTPError);

  function TextHTTPError(response, data) {
    _classCallCheck(this, TextHTTPError);

    var _this2 = _possibleConstructorReturn(this, (TextHTTPError.__proto__ || Object.getPrototypeOf(TextHTTPError)).call(this, response));

    _this2.data = data;
    return _this2;
  }

  return TextHTTPError;
}(HTTPError);

var JSONHTTPError = exports.JSONHTTPError = function (_HTTPError2) {
  _inherits(JSONHTTPError, _HTTPError2);

  function JSONHTTPError(response, json) {
    _classCallCheck(this, JSONHTTPError);

    var _this3 = _possibleConstructorReturn(this, (JSONHTTPError.__proto__ || Object.getPrototypeOf(JSONHTTPError)).call(this, response));

    _this3.json = json;
    return _this3;
  }

  return JSONHTTPError;
}(HTTPError);

var API = function () {
  function API() {
    var apiURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments[1];

    _classCallCheck(this, API);

    this.apiURL = apiURL;
    if (this.apiURL.match(/\/[^\/]?/)) {
      // eslint-disable-line no-useless-escape
      this._sameOrigin = true;
    }
    this.defaultHeaders = options && options.defaultHeaders || {};
  }

  _createClass(API, [{
    key: "headers",
    value: function headers() {
      var _headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({}, this.defaultHeaders, {
        "Content-Type": "application/json"
      }, _headers);
    }
  }, {
    key: "parseJsonResponse",
    value: function parseJsonResponse(response) {
      return response.json().then(function (json) {
        if (!response.ok) {
          return Promise.reject(new JSONHTTPError(response, json));
        }

        var pagination = (0, _pagination.getPagination)(response);
        return pagination ? { pagination: pagination, items: json } : json;
      });
    }
  }, {
    key: "request",
    value: function request(path) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var headers = this.headers(options.headers || {});
      if (this._sameOrigin) {
        options.credentials = options.credentials || "same-origin";
      }
      return fetch(this.apiURL + path, _extends({}, options, { headers: headers })).then(function (response) {
        var contentType = response.headers.get("Content-Type");
        if (contentType && contentType.match(/json/)) {
          return _this4.parseJsonResponse(response);
        }

        if (!response.ok) {
          return response.text().then(function (data) {
            return Promise.reject(new TextHTTPError(response, data));
          });
        }
        return response.text().then(function (data) {
          data;
        });
      });
    }
  }]);

  return API;
}();

exports.default = API;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mainController__ = __webpack_require__(8);


(scope => {
  scope.templatesPath = "./templates/";

  $(document).ready(() => {
    let controller = new __WEBPACK_IMPORTED_MODULE_0__mainController__["a" /* default */]();
    controller.start();
  });
})((window.tavtav = {}));


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mainView_bodyController__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_headerController__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils__ = __webpack_require__(0);




class MainController {
  constructor() {
    this.headerController;
    this.bodyController;
  }

  start() {
    let $headerView;
    let $mainView;

    __WEBPACK_IMPORTED_MODULE_2__common_utils__["a" /* default */].getTemplate("main").then(html => {
      $("body div#main").html(html);

      $headerView = $("#header");
      $mainView = $("#main-view");

      this.headerController = new __WEBPACK_IMPORTED_MODULE_1__header_headerController__["a" /* default */]($headerView);
      this.bodyController = new __WEBPACK_IMPORTED_MODULE_0__mainView_bodyController__["a" /* default */]($mainView);

      this.headerController.start(
        this.bodyController.openLoginDialog.bind(this.bodyController)
      );
      this.bodyController.start(
        this.headerController.initSession.bind(this.headerController)
      );
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MainController);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_login_login__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_register_register__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameView_game__ = __webpack_require__(19);




class BodyController {
  constructor($view) {
    this.$view = $view;
    this.session = null;
    this.auth = new GoTrue({
      APIUrl: "https://tavtav.netlify.com/.netlify/identity",
      audience: "",
      setCookie: false
    });
  }

  start(onLogin) {
    this.onLogin = onLogin;
    let game = new __WEBPACK_IMPORTED_MODULE_2__gameView_game__["a" /* default */](this.session);
    game.start(() => {
      if (this.session == null) {
        this.openLoginDialog();
      }
    });
  }

  openLoginDialog() {
    netlifyIdentity.open();
    // let login = new LoginModule(this.$view, this.auth).create(session => {
    //   this.session = session;
    //   this.onLogin(session);
    // }, this.openRegisterDialog.bind(this));
  }

  openRegisterDialog() {
    let register = new __WEBPACK_IMPORTED_MODULE_1__modules_register_register__["a" /* default */](this.$view, this.auth).create();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BodyController);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mockServer_mockServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formDialog_formDialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gotrue_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gotrue_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_gotrue_js__);





class LoginModule extends __WEBPACK_IMPORTED_MODULE_1__formDialog_formDialog__["a" /* default */] {
  constructor($container, auth) {
    super($container);
    this.formTemplate = "loginForm";
    this.dialogOptions = {
      className: "login-dialog",
      okLabel: "Login"
    };
    this.auth = auth;
  }

  create(onLogin, onNotRegisterdClick) {
    super.create(onLogin).then(() => {
      //MUST BE FIXED!!
      setTimeout(() => {
        $(this.dialog.getContent())
          .find("#register")
          .click(() => {
            this.close();
            onNotRegisterdClick();
          });
      }, 100);
    });
  }

  action(data) {
    // let userService = mockServer.getService("user");
    return this.auth.login(email, password).then(response => {
      this.handler(response.access_token);
    });
    // return userService.login(data).then(session => {
    //   this.handler(session);
    // });
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (LoginModule);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (new UserService());


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(0);


class Dialog {
  constructor(onAction, onClose, options) {
    this.$dialogElement = null;
    this.$dialogContent = null;
    this.$errorContainer = null;
    this.$cancelButton = null;
    this.$okButton = null;
    this.onAction = onAction;
    this.onClose = onClose;
    this.options = options;
  }

  create($container) {
    return __WEBPACK_IMPORTED_MODULE_0__common_utils__["a" /* default */].getTemplate("dialog").then(html => {
      $container.append(html);
      this.$dialogElement = $container.find(".dialog");
      this.$dialogContent = this.$dialogElement.find(".dialog-content");
      this.$cancelButton = this.$dialogElement.find(".cancel-button");
      this.$okButton = this.$dialogElement.find(".ok-button");
      this.$dialogElement.addClass(this.options.className);

      if (this.options.cancelLabel) {
        this.$cancelButton.html(this.options.cancelLabel);
      }

      if (this.options.okLabel) {
        this.$okButton.html(this.options.okLabel);
      }

      this.attachEvents();
    });
  }

  getContent() {
    return this.$dialogContent;
  }

  attachEvents() {
    this.$cancelButton.mousedown(() => {
      this.$cancelButton.addClass("active");
    });

    this.$cancelButton.mouseup(() => {
      this.$cancelButton.removeClass("active");
      this.close();
    });

    this.$okButton.mousedown(() => {
      this.$okButton.addClass("active");
    });

    this.$okButton.mouseup(() => {
      this.$okButton.removeClass("active");
      this.onAction();
    });
  }

  close() {
    this.onClose();
    this.$dialogElement.remove();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dialog);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formFieldValidators__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fromFieldValidation__ = __webpack_require__(1);




class Form {
  static get validationState() {
    return {
      UNSET: "unset",
      VALID: "valid",
      INVALID: "invalid"
    };
  }

  constructor(formTemplate, options) {
    this.$container = null;
    this.$formElement = null;
    this.$errorContainer = null;
    this.formTemplate = formTemplate;
    this.validState = Form.validationState.UNSET;
    this.options = options;
    this.data = {};
  }

  create($container) {
    this.$container = $container;
    return __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getTemplate(this.formTemplate).then(html => {
      __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].getTemplate("fieldError").then(errorElement => {
        this.errorElement = errorElement;
        $container.append(html);
        this.$formElement = $container.find("div.form");
        this.$errorContainer = this.$formElement.find(".form-error-message");
        this.$errorContainer.append("<p></p>");
        this.$fields = this.$formElement.find(".form-field");
        this.initFields();
      });
    });
  }

  initFields() {
    let $inputBuffer = null;
    $.each(this.$fields, (i, field) => {
      $inputBuffer = $($(field).find("input"));
      $inputBuffer.change(() => {
        if (this.validState == Form.validationState.INVALID) {
          this.validate.call(this);
        }
      });
    });
  }

  setValue(data) {
    for (let k in data) {
      this.$formElement.find("input[name='" + k + "'].form-field");
    }
  }

  getData() {
    let data = {};
    let $inputBuffer = null;
    $.each(this.$fields, (i, field) => {
      $inputBuffer = $($(field).find("input"));
      data[$inputBuffer.attr("name")] = $inputBuffer.val();
    });
    return data;
  }

  showError(error) {
    this.$errorContainer.find("p").html(error);
    this.$errorContainer.show();
  }

  hideError() {
    this.$errorContainer.find("p").html("");
    this.$errorContainer.hide();
  }

  validate() {
    let valid = true;
    let currentValid = true;

    $.each(this.$fields, (i, field) => {
      currentValid = this.validateField($(field));
      valid = valid && currentValid;
    });

    if (valid) {
      this.validState = Form.validationState.VALID;
    } else {
      this.validState = Form.validationState.INVALID;
    }

    return valid;
  }

  validateField($field) {
    let $input = $($field.find("input"));
    let value = $input.val();
    let fieldValidationName = $field.attr("validation");
    let validation = new __WEBPACK_IMPORTED_MODULE_2__fromFieldValidation__["a" /* default */]();
    let customValidators = this.options.validators;

    if ($field.attr("required")) {
      validation = __WEBPACK_IMPORTED_MODULE_1__formFieldValidators__["a" /* default */].required(value);
      if (validation.isValid && fieldValidationName) {
        if (typeof customValidators[fieldValidationName] == "function") {
          validation = customValidators[fieldValidationName](value);
        } else if (
          typeof __WEBPACK_IMPORTED_MODULE_1__formFieldValidators__["a" /* default */][fieldValidationName] == "function"
        ) {
          validation = __WEBPACK_IMPORTED_MODULE_1__formFieldValidators__["a" /* default */][fieldValidationName](value);
        }
      }
    } else if (fieldValidationName) {
      if (typeof customValidators[fieldValidationName] == "function") {
        validation = customValidators[fieldValidationName](value);
      } else if (
        typeof __WEBPACK_IMPORTED_MODULE_1__formFieldValidators__["a" /* default */][fieldValidationName] == "function"
      ) {
        validation = __WEBPACK_IMPORTED_MODULE_1__formFieldValidators__["a" /* default */][fieldValidationName](value);
      }
    }

    if (!validation.isValid) {
      $input.addClass("invalid");
      this.appendErrorToField($field, validation.error);
    } else {
      $input.removeClass("invalid");
      this.removeErrorFromField($field);
    }

    return validation.isValid;
  }

  appendErrorToField($field, error) {
    let $errorElement;
    let fieldError = $field.find("div.field-error")[0];
    if (!fieldError) {
      $field.append(this.errorElement);
      fieldError = $field.find("div.field-error")[0];
    }
    $errorElement = $(fieldError);
    $errorElement.show();
    $($errorElement.find("p")[0]).html(error);
  }

  removeErrorFromField($field) {
    let $errorElement;
    let fieldError = $field.find("div.field-error")[0];
    if (fieldError) {
      $errorElement = $(fieldError);
      $errorElement.hide();
      $($errorElement.find("p")[0]).html("");
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Form);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__ = __webpack_require__(1);



class BasicStringValidators {
  required(string) {
    return new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */](string !== "", "Value is required");
  }

  onlyLetters(string) {
    let validation = new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */]();
    if (!/^[a-z]+$/i.test(string)) {
      validation.setValidStatus(false);
      validation.setError("Must contain only letters");
    }
    return validation;
  }

  alphaNumeric(string) {
    let validation = new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */]();
    if (!/^[a-z0-9]+$/i.test(string)) {
      validation.setValidStatus(false);
      validation.setError("Must contain only letters and numbers");
    }
    return validation;
  }

  startsWithLetter(string) {
    let validation = new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */]();
    if (!/^[a-z]+$/i.test(string[0])) {
      validation.setValidStatus(false);
      validation.setError("Must start with a letter");
    }
    return validation;
  }

  maxLength(string, maxLength) {
    let validation = new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */]();
    if (string.length >= maxLength) {
      validation.setValidStatus(false);
      validation.setError("Max length is " + maxLength);
    }
    return validation;
  }

  minLength(string, minLength) {
    let validation = new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */]();
    if (string.length <= minLength) {
      validation.setValidStatus(false);
      validation.setError("Min length is " + minLength);
    }
    return validation;
  }

  lengthBetween(string, minLength, maxLength) {
    let validation = this.minLength(string, minLength);
    if (validation.isValid) {
      validation = this.maxLength(string, maxLength);
    }
    return validation;
  }

  email(string) {
    let validation = new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */]();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string)) {
      validation.setValidStatus(false);
      validation.setError("Must be a valid email");
    }
    return validation;
  }

  match(string1, string2) {
    return new __WEBPACK_IMPORTED_MODULE_0__fromFieldValidation__["a" /* default */](string1 == string2, "Do not match");
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BasicStringValidators);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getPagination = getPagination;
function getPagination(response) {
  var links = response.headers.get("Link");
  var pagination = {};
  //var link, url, rel, m, page;
  if (links == null) {
    return null;
  }
  links = links.split(",");
  var total = response.headers.get("X-Total-Count");

  for (var i = 0, len = links.length; i < len; i++) {
    var link = links[i].replace(/(^\s*|\s*$)/, "");

    var _link$split = link.split(";"),
        _link$split2 = _slicedToArray(_link$split, 2),
        url = _link$split2[0],
        rel = _link$split2[1];

    var m = url.match(/page=(\d+)/);
    var page = m && parseInt(m[1], 10);
    if (rel.match(/last/)) {
      pagination.last = page;
    } else if (rel.match(/next/)) {
      pagination.next = page;
    } else if (rel.match(/prev/)) {
      pagination.prev = page;
    } else if (rel.match(/first/)) {
      pagination.first = page;
    }
  }

  pagination.last = Math.max(pagination.last || 0, pagination.prev && pagination.prev + 1 || 0);
  pagination.current = pagination.next ? pagination.next - 1 : pagination.last || 1;
  pagination.total = total ? parseInt(total, 10) : null;

  return pagination;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _microApiClient = __webpack_require__(6);

var _microApiClient2 = _interopRequireDefault(_microApiClient);

var _admin = __webpack_require__(17);

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpiryMargin = 60 * 1000;
var storageKey = "gotrue.user";
var refreshPromises = {};
var currentUser = null;
var forbiddenUpdateAttributes = { api: 1, token: 1, audience: 1, url: 1 };
var forbiddenSaveAttributes = { api: 1 };
var isBrowser = function isBrowser() {
  return typeof window !== "undefined";
};

var User = function () {
  function User(api, tokenResponse, audience) {
    _classCallCheck(this, User);

    this.api = api;
    this.url = api.apiURL;
    this.audience = audience;
    this._processTokenResponse(tokenResponse);
    currentUser = this;
  }

  _createClass(User, [{
    key: "update",
    value: function update(attributes) {
      var _this = this;

      return this._request("/user", {
        method: "PUT",
        body: JSON.stringify(attributes)
      }).then(function (response) {
        return _this._saveUserData(response)._refreshSavedSession();
      });
    }
  }, {
    key: "jwt",
    value: function jwt(forceRefresh) {
      var _tokenDetails = this.tokenDetails(),
          expires_at = _tokenDetails.expires_at,
          refresh_token = _tokenDetails.refresh_token,
          access_token = _tokenDetails.access_token;

      if (forceRefresh || expires_at - ExpiryMargin < Date.now()) {
        return this._refreshToken(refresh_token);
      }
      return Promise.resolve(access_token);
    }
  }, {
    key: "logout",
    value: function logout() {
      return this._request("/logout", { method: "POST" }).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this));
    }
  }, {
    key: "_refreshToken",
    value: function _refreshToken(refresh_token) {
      var _this2 = this;

      if (refreshPromises[refresh_token]) {
        return refreshPromises[refresh_token];
      }
      return refreshPromises[refresh_token] = this.api.request("/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=refresh_token&refresh_token=" + refresh_token
      }).then(function (response) {
        delete refreshPromises[refresh_token];
        _this2._processTokenResponse(response);
        _this2._refreshSavedSession();
        return _this2.token.access_token;
      }).catch(function (error) {
        delete refreshPromises[refresh_token];
        _this2.clearSession();
        return Promise.reject(error);
      });
    }
  }, {
    key: "_request",
    value: function _request(path) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options.headers = options.headers || {};

      var aud = options.audience || this.audience;
      if (aud) {
        options.headers["X-JWT-AUD"] = aud;
      }

      return this.jwt().then(function (token) {
        return _this3.api.request(path, _extends({
          headers: Object.assign(options.headers, {
            Authorization: "Bearer " + token
          })
        }, options)).catch(function (err) {
          if (err instanceof _microApiClient.JSONHTTPError && err.json) {
            if (err.json.msg) {
              err.message = err.json.msg;
            } else if (err.json.error) {
              err.message = err.json.error + ": " + err.json.error_description;
            }
          }
          return Promise.reject(err);
        });
      });
    }
  }, {
    key: "getUserData",
    value: function getUserData() {
      return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this));
    }
  }, {
    key: "_saveUserData",
    value: function _saveUserData(attributes, fromStorage) {
      for (var key in attributes) {
        if (key in User.prototype || key in forbiddenUpdateAttributes) {
          continue;
        }
        this[key] = attributes[key];
      }
      if (fromStorage) {
        this._fromStorage = true;
      }
      return this;
    }
  }, {
    key: "_processTokenResponse",
    value: function _processTokenResponse(tokenResponse) {
      this.token = tokenResponse;
      var claims = void 0;
      try {
        claims = JSON.parse(urlBase64Decode(tokenResponse.access_token.split(".")[1]));
        this.token.expires_at = claims.exp * 1000;
      } catch (e) {
        console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: " + JSON.stringify(tokenResponse)));
      }
    }
  }, {
    key: "_refreshSavedSession",
    value: function _refreshSavedSession() {
      // only update saved session if we previously saved something
      if (isBrowser() && localStorage.getItem(storageKey)) {
        this._saveSession();
      }
      return this;
    }
  }, {
    key: "_saveSession",
    value: function _saveSession() {
      isBrowser() && localStorage.setItem(storageKey, JSON.stringify(this._details));
      return this;
    }
  }, {
    key: "tokenDetails",
    value: function tokenDetails() {
      return this.token;
    }
  }, {
    key: "clearSession",
    value: function clearSession() {
      User.removeSavedSession();
      this.token = null;
      currentUser = null;
    }
  }, {
    key: "admin",
    get: function get() {
      return new _admin2.default(this);
    }
  }, {
    key: "_details",
    get: function get() {
      var userCopy = {};
      for (var key in this) {
        if (key in User.prototype || key in forbiddenSaveAttributes) {
          continue;
        }
        userCopy[key] = this[key];
      }
      return userCopy;
    }
  }], [{
    key: "removeSavedSession",
    value: function removeSavedSession() {
      isBrowser() && localStorage.removeItem(storageKey);
    }
  }, {
    key: "recoverSession",
    value: function recoverSession(apiInstance) {
      if (currentUser) {
        return currentUser;
      }

      var json = isBrowser() && localStorage.getItem(storageKey);
      if (json) {
        try {
          var data = JSON.parse(json);
          var url = data.url,
              token = data.token,
              audience = data.audience;

          if (!url || !token) {
            return null;
          }

          var api = apiInstance || new _microApiClient2.default(url, {});
          return new User(api, token, audience)._saveUserData(data, true);
        } catch (ex) {
          console.error(new Error("Gotrue-js: Error recovering session: " + ex));
          return null;
        }
      }

      return null;
    }
  }]);

  return User;
}();

exports.default = User;


function urlBase64Decode(str) {
  // From https://jwt.io/js/jwt.js
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  try {
    return decodeURIComponent(escape(result));
  } catch (err) {
    return result;
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function () {
  function Admin(user) {
    _classCallCheck(this, Admin);

    this.user = user;
  }

  // Return a list of all users in an audience


  _createClass(Admin, [{
    key: "listUsers",
    value: function listUsers(aud) {
      return this.user._request("/admin/users", {
        method: "GET",
        audience: aud
      });
    }
  }, {
    key: "getUser",
    value: function getUser(user) {
      return this.user._request("/admin/users/" + user.id);
    }
  }, {
    key: "updateUser",
    value: function updateUser(user) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.user._request("/admin/users/" + user.id, {
        method: "PUT",
        body: JSON.stringify(attributes)
      });
    }
  }, {
    key: "createUser",
    value: function createUser(email, password) {
      var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      attributes.email = email;
      attributes.password = password;
      return this.user._request("/admin/users", {
        method: "POST",
        body: JSON.stringify(attributes)
      });
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(user) {
      return this.user._request("/admin/users/" + user.id, {
        method: "DELETE"
      });
    }
  }]);

  return Admin;
}();

exports.default = Admin;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formDialog_formDialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mockServer_mockServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_form_formFieldValidators__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_form_fromFieldValidation__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gotrue_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gotrue_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_gotrue_js__);







class RegisterModule extends __WEBPACK_IMPORTED_MODULE_0__formDialog_formDialog__["a" /* default */] {
  constructor($container, auth) {
    super($container);
    this.formTemplate = "registerForm";
    this.dialogOptions = {
      className: "register-dialog",
      cancelLabel: "Not Now",
      okLabel: "Register"
    };
    this.formOptions = {
      validators: {
        password: this.passwordValidation
      }
    };
    this.auth = auth;
  }

  action(data) {
    //  let userService = mockServer.getService("user");
    this.auth
      .signup(data.email, data.password)
      .then(response => console.log("Confirmation email sent", response))
      .catch(error => console.log("It's an error", error));
    //return userService.register(data);
  }

  passwordValidation(passwordValue) {
    let validation = new __WEBPACK_IMPORTED_MODULE_3__common_form_fromFieldValidation__["a" /* default */]();
    let password = $(".form-field input[name='password']").val();
    let reEnterPassword = $(".form-field input[name='reEnterPassword']").val();

    validation = __WEBPACK_IMPORTED_MODULE_2__common_form_formFieldValidators__["a" /* default */].password(passwordValue);
    if (validation.isValid) {
      if (password && reEnterPassword) {
        validation = __WEBPACK_IMPORTED_MODULE_2__common_form_formFieldValidators__["a" /* default */].match(password, reEnterPassword);
        if (!validation.isValid) {
          validation.setError("Passwords " + validation.error);
        }
      }
    }

    return validation;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RegisterModule);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__welcomeScreen_welcome__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playScreen_play__ = __webpack_require__(21);



class Game {
  constructor(session) {
    this.session = session;
    this.$gameView = $("#game-view");
  }

  start(onPlay) {
    let play;
    let welcome = new __WEBPACK_IMPORTED_MODULE_0__welcomeScreen_welcome__["a" /* default */](this.$gameView);
    welcome.create(() => {
      welcome.destroy();
      play = new __WEBPACK_IMPORTED_MODULE_1__playScreen_play__["a" /* default */](this.$gameView);
      play.create();
      onPlay();
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(0);


class Welcome {
  constructor($view) {
    this.$view = $view;
  }

  create(onPlayClick) {
    __WEBPACK_IMPORTED_MODULE_0__common_utils__["a" /* default */].getTemplate("welcome").then(html => {
      let $playButton;
      this.$view.append(html);
      $playButton = $("#play-button");
      $playButton.click(() => {
        onPlayClick();
      });
    });
  }

  destroy() {
    this.$view.empty();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Welcome);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(0);


class Play {
  constructor($view) {
    this.ctx = new AudioContext();
    this.$view = $view;
  }

  create() {
    __WEBPACK_IMPORTED_MODULE_0__common_utils__["a" /* default */].getTemplate("play").then(html => {
      let $playSoundButton;
      this.$view.append(html);
      $playSoundButton = $("#play-sound");
      $playSoundButton.mousedown(() => {
        $playSoundButton.addClass("pressed");
      });
      $playSoundButton.mouseup(() => {
        $playSoundButton.removeClass("pressed");
        this.playSound();
      });
    });
  }

  playSound() {
    let o = this.ctx.createOscillator();
    let  g = this.ctx.createGain(); 
    o.connect(g);
    o.type = "triangle";
    g.connect(this.ctx.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(
      0.00001, this.ctx.currentTime + 1
    )
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Play);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mockServer_mockServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_session__ = __webpack_require__(23);



class HeaderController {
  constructor($view) {
    this.$view = $view;
    this.session = new __WEBPACK_IMPORTED_MODULE_1__session_session__["a" /* default */]();
  }

  start(onLoginClick) {
    this.onLoginClick = onLoginClick;
    this.attachEvent();
  }

  initSession(session) {
    let $login = this.$view.find("#login");
    let $welcome = this.$view.find("#welcome");

    this.session = session;

    $login.hide();
    $welcome.show();
    $welcome.html("Welcome " + session.user.firstname);
  }

  attachEvent() {
    let $login = this.$view.find("#login");
    $login.click(this.onLoginClick);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HeaderController);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Session {
  constructor() {
    this.id = null;
    this.user = null;
  }

  setId(id) {
    this.id = id;
  }

  setUser(user) {
    this.user = user;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Session);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map