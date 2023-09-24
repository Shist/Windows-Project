export function hideAllModals() {
  const allModalWindows = document.querySelectorAll("[data-modal]");
  allModalWindows.forEach((nextModalWindow) => {
    nextModalWindow.style.display = "none";
  });
}

const modals = () => {
  function bindModal(
    modalType,
    triggerSelector,
    modalSelector,
    closeBtnSelector,
    closeClickOverlay = true
  ) {
    const triggerElements = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);
    const closeBtn = document.querySelector(closeBtnSelector);

    const widthInput = document.querySelector("#width");
    const heightInput = document.querySelector("#height");
    const profileCheckbox = document.querySelectorAll(
      "[data-profile-checkbox]"
    );

    const errorMsg = document.createElement("div");
    errorMsg.setAttribute("data-modal-error", true);
    errorMsg.classList.add("status");
    errorMsg.style.marginBottom = "10px";

    triggerElements.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }
        switch (modalType) {
          case "checkbox_form":
            if (widthInput.value && heightInput.value) {
              errorMsg.remove();
              hideAllModals();
              modalWindow.style.display = "block";
              document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
              // document.body.classList.add("modal-open"); // Alternative to upper line (bootstrap class)
            } else {
              if (!widthInput.value) {
                errorMsg.textContent = "Пожалуйста, укажите ширину";
              } else {
                errorMsg.textContent = "Пожалуйста, укажите высоту";
              }
              item.insertAdjacentElement("beforebegin", errorMsg);
            }
            break;
          case "final_form":
            let checkIsPut = false;
            profileCheckbox.forEach((checkbox) => {
              if (checkbox.checked) {
                checkIsPut = true;
              }
            });
            if (checkIsPut) {
              errorMsg.remove();
              hideAllModals();
              modalWindow.style.display = "block";
              document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
              // document.body.classList.add("modal-open"); // Alternative to upper line (bootstrap class)
            } else {
              errorMsg.textContent =
                'Пожалуйста, выберите профиль остекления ("Холодное" или "Теплое")';
              item.insertAdjacentElement("beforebegin", errorMsg);
            }
            break;
          default:
            hideAllModals();
            modalWindow.style.display = "block";
            document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
          // document.body.classList.add("modal-open"); // Alternative to upper line (bootstrap class)
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      hideAllModals();
      modalWindow.style.display = "none";
      document.body.style.overflow = ""; // make page scrolling again after modal is closed
      //   document.body.classList.remove("modal-open"); // Alternative to upper line (bootstrap class)
    });

    modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow && closeClickOverlay) {
        hideAllModals();
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
    "engineer_form",
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal("call_form", ".phone_link", ".popup", ".popup .popup_close");
  bindModal(
    "width-height_form",
    ".popup_calc_btn",
    ".popup_calc",
    ".popup_calc_close"
  );
  bindModal(
    "checkbox_form",
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );
  bindModal(
    "final_form",
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );
  showModalByTime(".popup", 60000);
};

export default modals;
