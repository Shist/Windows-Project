export function hideTabContent(content, tabs, activeClass) {
  content.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove(activeClass);
  });
}

export function showTabContent(
  content,
  tabs,
  activeClass,
  display = "block",
  index = 0
) {
  content[index].style.display = display;
  tabs[index].classList.add(activeClass);
}

const tabs = (
  headerSelector,
  tabsSelector,
  contentSelector,
  activeClass,
  display = "block"
) => {
  const header = document.querySelector(headerSelector);
  const tabs = document.querySelectorAll(tabsSelector);
  const content = document.querySelectorAll(contentSelector);

  hideTabContent(content, tabs, activeClass);
  showTabContent(content, tabs, activeClass, display);

  header.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target &&
      (target.classList.contains(tabsSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabsSelector.replace(/\./, "")))
    ) {
      tabs.forEach((item, index) => {
        if (target === item || target.parentNode === item) {
          hideTabContent(content, tabs, activeClass);
          showTabContent(content, tabs, activeClass, display, index);
        }
      });
    }
  });
};

export default tabs;
