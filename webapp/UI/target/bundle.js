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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_userService__ = __webpack_require__(9);


class MockServer {
  constructor() {
    this.services = [];
    this.services.user = __WEBPACK_IMPORTED_MODULE_0__services_userService__["a" /* default */];
  }

  getService(serviceName) {
    return this.services[serviceName];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new MockServer());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_dialog_dialog__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_form_form__ = __webpack_require__(11);
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
      this.onOk.bind(this),
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

  onOk() {
    let data;
    let valid = this.form.validate();
    if (!valid) {
      return;
    }

    data = this.form.getData();
    this.action(data)
      .then(response => {
        this.close();
      })
      .fail(error => {
        this.form.showError(error);
      });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basicStringValidators__ = __webpack_require__(12);


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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mainController__ = __webpack_require__(6);


(scope => {
  scope.templatesPath = "./templates/";

  $(document).ready(() => {
    let controller = new __WEBPACK_IMPORTED_MODULE_0__mainController__["a" /* default */]();
    controller.start();
  });
})((window.tavtav = {}));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mainView_bodyController__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_headerController__ = __webpack_require__(17);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_login_login__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_register_register__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gameView_game__ = __webpack_require__(14);




class BodyController {
  constructor($view) {
    this.$view = $view;
    this.session = null;
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
    let login = new __WEBPACK_IMPORTED_MODULE_0__modules_login_login__["a" /* default */](this.$view).create(session => {
      this.session = session;
      this.onLogin(session);
    }, this.openRegisterDialog.bind(this));
  }

  openRegisterDialog() {
    let register = new __WEBPACK_IMPORTED_MODULE_1__modules_register_register__["a" /* default */](this.$view).create();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BodyController);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mockServer_mockServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formDialog_formDialog__ = __webpack_require__(3);



class LoginModule extends __WEBPACK_IMPORTED_MODULE_1__formDialog_formDialog__["a" /* default */] {
  constructor($container) {
    super($container);
    this.formTemplate = "loginForm";
    this.dialogOptions = {
      className: "login-dialog",
      okLabel: "Login"
    };
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
    let userService = __WEBPACK_IMPORTED_MODULE_0__mockServer_mockServer__["a" /* default */].getService("user");
    return userService.login(data).then(session => {
      this.handler(session);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LoginModule);


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(0);


class Dialog {
  constructor(onOk, onClose, options) {
    this.$dialogElement = null;
    this.$dialogContent = null;
    this.$errorContainer = null;
    this.$cancelButton = null;
    this.$okButton = null;
    this.onOk = onOk;
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
      this.onOk();
    });
  }

  close() {
    this.onClose();
    this.$dialogElement.remove();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dialog);


/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formDialog_formDialog__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mockServer_mockServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_form_formFieldValidators__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_form_fromFieldValidation__ = __webpack_require__(1);





class RegisterModule extends __WEBPACK_IMPORTED_MODULE_0__formDialog_formDialog__["a" /* default */] {
  constructor($container) {
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
  }

  action(data) {
    let userService = __WEBPACK_IMPORTED_MODULE_1__mockServer_mockServer__["a" /* default */].getService("user");
    return userService.register(data);
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__welcomeScreen_welcome__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playScreen_play__ = __webpack_require__(16);



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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mockServer_mockServer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_session__ = __webpack_require__(18);



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
/* 18 */
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