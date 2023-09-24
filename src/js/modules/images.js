export const imageOpenStatus = {
  opened: false,
};

const images = () => {
  const imgPopup = document.createElement("div");
  const workSection = document.querySelector(".works");
  const bigImage = document.createElement("img");

  imgPopup.classList.add("popup");
  workSection.appendChild(imgPopup);

  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignItems = "center";
  imgPopup.style.display = "none";

  bigImage.classList.add("image-size-limiter");
  imgPopup.appendChild(bigImage);

  workSection.addEventListener("click", (e) => {
    e.preventDefault();

    const target = e.target;

    if (target && target.classList.contains("preview")) {
      imgPopup.style.display = "flex";
      document.body.style.overflow = "hidden"; // prevent page scrolling while modal is opened
      const path = target.parentNode.getAttribute("href");
      bigImage.setAttribute("src", path);
    }

    if (target && target.matches("div.popup")) {
      document.body.style.overflow = ""; // make page scrolling again after modal is closed
      imgPopup.style.display = "none";
    }
  });
};

export default images;
