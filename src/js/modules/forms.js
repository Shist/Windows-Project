const forms = () => {
  const formsList = document.querySelectorAll("form");
  const inputsList = document.querySelectorAll("input");
  const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

  phoneInputs.forEach((phoneInput) => {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/\D/, ""); // Clearing all symbols that are NOT numbers
    });
  });

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
