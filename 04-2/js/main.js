(() => {
  const numVal = document.querySelector('#numVal');
  const okBtn = document.querySelector('#okBtn');
  const progressBar = document.querySelector('#progressBar');
  const classNames = ['bg-danger', 'bg-info', 'bg-success'];
  const classRegExp = /\bbg-.+?\b/g;
  
  const getProgressClass = () => {
    const val = Number(numVal.value);
    if (val < 40) {
      return classNames[0];
    }
    if (val < 70) {
      return classNames[1];
    }
    return classNames[2];
  };

  const setProgressBarWidth = () => {
    progressBar.style.width = `${numVal.value}%`;
    progressBar.setAttribute('aria-valuenow', `${numVal.value}`);
  }

  numVal.addEventListener('input', (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (event.target.value > 100) {
      event.target.value = 100;
    }
  })

  okBtn.addEventListener('click', (event) => {
    const barClass = getProgressClass();
    progressBar.className = progressBar.className.replace(classRegExp, '');
    progressBar.classList.toggle(barClass);
    setProgressBarWidth();
  })
})();

