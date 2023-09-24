const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeBtnSelector) {
    const triggerElements = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);
    const closeBtn = document.querySelector(closeBtnSelector);

    triggerElements.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }
        modalWindow.style.display = "block";
        document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
        // document.body.classList.add("modal-open"); // Alternative to upper line (bootstrap class)
      });
    });

    closeBtn.addEventListener("click", () => {
      modalWindow.style.display = "none";
      document.body.style.overflow = ""; // make page scrolling again after modal is closed
      //   document.body.classList.remove("modal-open"); // Alternative to upper line (bootstrap class)
    });

    modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow) {
        modalWindow.style.display = "none";
        document.body.style.overflow = ""; // make page scrolling again after modal is closed
        // document.body.classList.remove("modal-open"); // Alternative to upper line (bootstrap class)
      }
    });
  }

  function showModalByTime(modalSelector, time) {
    setTimeout(() => {
      document.querySelector(modalSelector).style.display = "block";
      document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
    }, time);
  }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  showModalByTime(".popup", 60000);
};

export default modals;
