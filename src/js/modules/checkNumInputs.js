const checkNumInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector);
  numInputs.forEach((numInput) => {
    numInput.addEventListener("input", () => {
      numInput.value = numInput.value.replace(/\D/, ""); // Clearing all symbols that are NOT numbers
    });
  });
};

export default checkNumInputs;
