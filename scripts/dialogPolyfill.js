const showModalPolyFill = (dialogEl) => {
  console.log({ dialogEl, foo: dialogEl.showModal });
  if (dialogEl.showModal) return;
  dialogEl.setAttribute("polyfill", "true");
  dialogEl.showModal = () => {
    dialogEl.setAttribute("open", "");
    return dialogEl;
  };
  dialogEl.close = () => {
    dialogEl.removeAttribute("open");
    return dialogEl;
  };
  dialogEl
    .querySelector('form[method="dialog"]')
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      dialogEl.close();
    });
};

document.querySelectorAll("dialog").forEach(showModalPolyFill);
