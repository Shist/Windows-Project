const timer = (timerSelector, deadline) => {
  const addZero = (num) => {
    if (num <= 9) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  };

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);

    return { total, days, hours, minutes, seconds };
  };

  const setClock = (selector, endTime) => {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); // to update timer instantly

    function updateClock() {
      const timeObj = getTimeRemaining(endTime);
      days.textContent = addZero(timeObj.days);
      hours.textContent = addZero(timeObj.hours);
      minutes.textContent = addZero(timeObj.minutes);
      seconds.textContent = addZero(timeObj.seconds);
      if (timeObj.total <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        clearInterval(timeInterval);
      }
    }
  };

  setClock(timerSelector, deadline);
};

export default timer;
