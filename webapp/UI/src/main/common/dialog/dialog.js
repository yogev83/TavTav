import Utils from "../../common/utils";

class Dialog {
  constructor(onOk, options) {
    this.$dialogElement = null;
    this.$dialogContent = null;
    this.$errorContainer = null;
    this.$cancelButton = null;
    this.$okButton = null;
    this.onOk = onOk;
    this.options = options;
  }

  create($container) {
    return Utils.getTemplate("dialog").then(html => {
      $container.append(html);
      this.$dialogElement = $container.find(".dialog");
      this.$dialogContent = this.$dialogElement.find(".dialog-content");
      this.$cancelButton = this.$dialogElement.find(".cancel-button");
      this.$okButton = this.$dialogElement.find(".ok-button");
      this.$dialogElement.addClass(this.options.className);
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
      if (this.$okButton.enabled) {
        this.$okButton.addClass("active");
      }
    });

    this.$okButton.mouseup(() => {
      if (this.$okButton.enabled) {
        this.$okButton.removeClass("active");
        this.onOk();
      }
    });
  }

  onContentValidationChanged(valid) {
    this.enableOkButton(valid);
  }

  enableOkButton(bool) {
    if (bool) {
      this.$okButton.removeClass("disabled");
    } else {
      this.$okButton.addClass("disabled");
    }
    this.$okButton.enabled = bool;
  }

  close() {
    this.$dialogElement.remove();
  }
}

export default Dialog;
