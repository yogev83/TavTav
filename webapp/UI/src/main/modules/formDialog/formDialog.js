import Dialog from "../../common/dialog/dialog";
import Form from "../../common/form/form";
import Utils from "../../common/utils";

class FormDialogModule {
  constructor() {
    this.dialog = null;
    this.form = null;
    this.$container = $("#main");
    this.okPressed = false;
  }

  create(handler) {
    this.handler = handler;
    this.dialog = new Dialog(this.onOk.bind(this), this.onClose.bind(this), this.dialogOptions);

    this.form = new Form(this.formTemplate, { formError: this.formError });

    return this.dialog.create(this.$container).then(() => {
      Utils.showOverlay();
      return this.form.create(
        this.dialog.getContent()
      );
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
    Utils.hideOverlay();
  }
}

export default FormDialogModule;
