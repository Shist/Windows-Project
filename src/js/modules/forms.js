import checkNumInputs from "./checkNumInputs";
import { hideTabContent, showTabContent } from "./tabs";
import { hideAllModals } from "./modals";

export const lastModalTimeoutId = {
  link: null,
  messageLink: null,
};

const forms = (state) => {
  const formsList = document.querySelectorAll("form");
  const inputsList = document.querySelectorAll("input");
  const selectType = document.querySelector("#view_type");
  const profileCheckbox = document.querySelectorAll("[data-profile-checkbox]");

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    let result = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await result.text();
  };

  const clearInputs = () => {
    hideTabContent(
      document.querySelectorAll(".big_img > img"),
      document.querySelectorAll(".balcon_icons_img"),
      "do_image_more"
    );
    showTabContent(
      document.querySelectorAll(".big_img > img"),
      document.querySelectorAll(".balcon_icons_img"),
      "do_image_more",
      "inline-block"
    );
    inputsList.forEach((input) => (input.value = ""));
    selectType.value = "tree";
    profileCheckbox.forEach((checkbox) => (checkbox.checked = false));
  };

  formsList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMsg = document.createElement("div");
      statusMsg.classList.add("status");
      lastModalTimeoutId.messageLink = statusMsg;
      form.appendChild(statusMsg);

      const formData = new FormData(form);

      if (form.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData("assets/server.php", formData)
        .then((results) => {
          console.log("Успешная отправка данных на сервер:");
          console.log(results);
          statusMsg.textContent = message.success;
        })
        .catch(() => {
          statusMsg.textContent = message.failure;
        })
        .finally(() => {
          for (let key in state) {
            if (key === "form") {
              state[key] = 0;
            } else if (key === "type") {
              state[key] = "tree";
            } else {
              state[key] = null;
            }
          }
          clearInputs();
          lastModalTimeoutId.link = setTimeout(() => {
            statusMsg.remove();
            hideAllModals();
            document.body.style.overflow = "";
          }, 5000);
        });
    });
  });
};

export default forms;
