import Dialog from "../../common/dialog/dialog";
import Form from "../../common/form/form";
import Utils from "../../common/utils";

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
    this.dialog = new Dialog(
      this.onAction.bind(this),
      this.onClose.bind(this),
      this.dialogOptions
    );

    this.form = new Form(this.formTemplate, this.formOptions);

    return this.dialog.create(this.$container).then(() => {
      Utils.showOverlay();
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
    Utils.hideOverlay();
  }
}

export default FormDialogModule;
