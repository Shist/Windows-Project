import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  const formsList = document.querySelectorAll("form");
  const inputsList = document.querySelectorAll("input");

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
    inputsList.forEach((input) => (input.value = ""));
  };

  formsList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMsg = document.createElement("div");
      statusMsg.classList.add("status");
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
          clearInputs();
          setTimeout(() => {
            statusMsg.remove();
          }, 5000);
        });
    });
  });
};

export default forms;
