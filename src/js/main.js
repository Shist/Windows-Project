import "./slider";
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  let calcModalState = {
    form: 0,
    width: null,
    height: null,
    type: "tree",
    profile: null,
  };

  const targetFullDate = new Date(); // Today's date (this variable will be changed)
  targetFullDate.setDate(targetFullDate.getDate() + 3); // Today's date + 3 days
  targetFullDate.setUTCHours(0, 0, 0, 0); // Today's date + 3 days, but with zero hours, minutes, seconds and milliseconds (UTC)

  changeModalState(calcModalState);
  modals();
  tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
  tabs(
    ".decoration_slider",
    ".no_click",
    ".decoration_content > div > div",
    "after_click"
  );
  tabs(
    ".balcon_icons",
    ".balcon_icons_img",
    ".big_img > img",
    "do_image_more",
    "inline-block"
  );
  forms(calcModalState);
  timer(".container1", targetFullDate);
});
