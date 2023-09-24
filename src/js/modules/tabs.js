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

  const hideTabContent = () => {
    content.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  };

  const showTabContent = (index = 0) => {
    content[index].style.display = display;
    tabs[index].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();

  header.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target &&
      (target.classList.contains(tabsSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabsSelector.replace(/\./, "")))
    ) {
      tabs.forEach((item, index) => {
        if (target === item || target.parentNode === item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
};

export default tabs;
