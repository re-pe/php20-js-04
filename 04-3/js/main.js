const ak = document.querySelector('#ak');

// const akShadowRoot = document.querySelector('#ak #shadow-root');

ak.addEventListener('input', (event) => {
    // console.log(`Current: ${event.target.value}`);
    // if (event.target.validity.valid) {
    //     event.target.setAttribute('data-value', event.target.value);
    // } else {
    //     event.target.value = event.target.getAttribute('data-value');
    // }
    // return;
    // if (!event.target.validity.valid) {
    //     event.target.value = event.target.value.slice(0, -1);
    //     return;
    // }

    // if (event.target.value.length < 11) {
    //     event.target.classList.add('text-danger');
    //     return;
    // }

    // if (event.target.value.length > 11) {
    //     event.target.value = event.target.value.slice(0, -1);
    // }

    // if (event.target.value.slice(-1) === '.') {
    //     event.target.value = event.target.value.slice(0, -1);
    //     return;
    // }

    // event.target.classList.remove('text-danger');
    // event.target.classList.add('text-info');
});

const classRegExp = /\btext-.+?\b/g;
const form = document.forms['form'];
const errorCodes = {
    '0': 'Asmens kodas teisingas',
    '255': 'Įvesta per mažai skaičių!',
}

const checkPid = (value) => {
    if (value.length < 11) {
        return 255;
    }

    if (!/^[0-9]+$/.test(value)) {
        return 255;
    }
}

form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation()
    }

    ak.className = ak.className.replace(classRegExp, '');
    const result = checkPid(ak.value);
    // const className = result['className'];
    ak.classList.add('text-info');
});

