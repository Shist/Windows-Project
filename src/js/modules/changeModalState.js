import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
  const windowShapes = document.querySelectorAll(".balcon_icons_img");
  const windowWidths = document.querySelectorAll("#width");
  const windowHeights = document.querySelectorAll("#height");
  const windowTypes = document.querySelectorAll("#view_type");
  const windowProfiles = document.querySelectorAll(".checkbox");

  checkNumInputs("#width");
  checkNumInputs("#height");

  const bindActionToElements = (event, elementsList, stateProp) => {
    elementsList.forEach((element, index) => {
      element.addEventListener(event, () => {
        switch (element.nodeName) {
          case "SPAN":
            state[stateProp] = index;
            break;
          case "INPUT":
            if (element.getAttribute("type") === "checkbox") {
              index
                ? (state[stateProp] = "Теплое")
                : (state[stateProp] = "Холодное");
              elementsList.forEach((boxElement, boxIndex) => {
                boxElement.checked = false;
                if (boxIndex === index) {
                  boxElement.checked = true;
                }
              });
            } else {
              state[stateProp] = element.value;
            }
            break;
          case "SELECT":
            state[stateProp] = element.value;
            break;
        }
      });
    });
  };

  bindActionToElements("click", windowShapes, "form");
  bindActionToElements("input", windowWidths, "width");
  bindActionToElements("input", windowHeights, "height");
  bindActionToElements("change", windowTypes, "type");
  bindActionToElements("change", windowProfiles, "profile");
};

export default changeModalState;
