import { lastModalTimeoutId } from "./forms";

export function hideAllModals() {
  const allModalWindows = document.querySelectorAll("[data-modal]");
  allModalWindows.forEach((nextModalWindow) => {
    nextModalWindow.style.display = "none";
  });
}

export const initModalTimeoutId = {
  link: null,
};

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

    const setModal = () => {
      errorMsg.remove();
      hideAllModals();
      modalWindow.style.display = "block";
      document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
      // document.body.classList.add("modal-open"); // Alternative to upper line (bootstrap class)
      document.body.style.marginRight = `${calcScroll()}px`; // This is needed to avoid moving the page when the vertical scroll is removed
    };

    const closeModal = () => {
      clearInterval(lastModalTimeoutId.link);
      hideAllModals();
      modalWindow.style.display = "none";
      document.body.style.overflow = ""; // make page scrolling again after modal is closed
      //   document.body.classList.remove("modal-open"); // Alternative to upper line (bootstrap class)
      document.body.style.marginRight = "0px"; // This is needed to avoid moving the page when the vertical scroll is removed
    };

    triggerElements.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }
        clearInterval(initModalTimeoutId.link); // Cleaning timeout in case if user already opened some modal
        switch (modalType) {
          case "checkbox_form":
            if (widthInput.value && heightInput.value) {
              setModal();
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
              setModal();
            } else {
              errorMsg.textContent =
                'Пожалуйста, выберите профиль остекления ("Холодное" или "Теплое")';
              item.insertAdjacentElement("beforebegin", errorMsg);
            }
            break;
          default:
            setModal();
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      closeModal();
    });

    modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow && closeClickOverlay) {
        closeModal();
      }
    });
  }

  function showModalByTime(modalSelector, time) {
    initModalTimeoutId.link = setTimeout(() => {
      document.querySelector(modalSelector).style.display = "block";
      document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
    }, time);
  }

  function calcScroll() {
    const div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
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
