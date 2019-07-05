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

export default new Utils();
