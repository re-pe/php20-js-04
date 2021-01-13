(() => {
    const numVal = document.querySelector('#numVal');
    const okBtn = document.querySelector('#okBtn');
    const progressBar = document.querySelector('#progressBar');
    const classNames = ['bg-danger', 'bg-info', 'bg-success'];
    const rxBgClasses = /\bbg-.+?\b/g;

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

    const changeProgressBarWidth = () => {
        const barClass = getProgressClass();
        progressBar.className = progressBar.className.replace(rxBgClasses, '');
        progressBar.classList.add(barClass);
        setProgressBarWidth();
    }

    numVal.addEventListener('input', (event) => {
        if (event.target.value < 0) {
            event.target.value = 0;
        }
        if (event.target.value > 100) {
            event.target.value = 100;
        }
    })

    numVal.addEventListener('keypress', (event) => {
        if (!["Enter", "NumpadEnter"].includes(event.code)) {
            return;
        }
        changeProgressBarWidth();
    })

    okBtn.addEventListener('click', (event) => {
        changeProgressBarWidth();
    })
})();

