import Utils from "../../common/utils";

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
    return Utils.getTemplate("dialog").then(html => {
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

export default Dialog;
