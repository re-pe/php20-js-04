(() => {
    'use strict'

    const form = document.forms['form'];
    const ak = form.ak;
    const feedback = form.querySelector('#feedback');

    ak.addEventListener('focus', (event) => {
        event.target.setAttribute("pattern", "^[0-9]{0,11}$");
    })

    ak.addEventListener('blur', (event) => {
        event.target.setAttribute("pattern", "^[0-9]{11}$");
    })

    ak.addEventListener('input', (event) => {
        const el = event.target;
        const validity = el.validity;
        if (!validity.patternMismatch) {
            el.setCustomValidity('');
            el.setAttribute('data-value', el.value);
        } else if (validity.valueMissing) {
            el.setCustomValidity('');
            el.value = '';
        } else {
            event.target.value = event.target.getAttribute('data-value');
        }

        if (event.target.value.length < 11) {
            event.target.classList.add('text-danger');
            form.classList.remove('was-validated')
            return;
        }

        event.target.classList.remove('text-danger');
        event.target.classList.add('text-info');
    });

    const validationMessage = (el) => {
        const validity = el.validity;
        let result = "";
        switch (true) {
            case validity.customError:
                result = ak.validationMessage;
                break;
            case validity.patternMismatch:
                result = "Asmens kodui trūksta skaitmenų."
                break;
            case validity.valueMissing:
                result = "Prašome įvesti teisingą asmens kodą.";
                break;
            default:
        }
        return result;
    }

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }

    const calcControlDigit = (digits, shift = 0) => {

        const digitsHead = digits.slice(0, -1);
        let sumFin = digitsHead.reduce((sum, value, index) => {
            index += shift + 1;
            if (index > 9) {
                index -= 9;
            }
            value *= index;
            return sum + value;

        }, 0);

        let remainder = sumFin % 11;
        let result = "";
        if (remainder !== 10) {
            result = (remainder === digits[digits.length - 1]) ? "" : "Neatitinka kontrolinis skaičius";
            return result;
        }

        if (shift === 0) {
            result = calcControlDigit(digits, 2);
            return result;
        }

        result = (0 === digits[digits.length - 1]) ? "" : "Neatitinka kontrolinis skaičius";
        return result;

    }

    const checkControlSum = (pid) => {
        const chars = pid.split('');
        const digits = chars.map(value => parseInt(value));
        const result = calcControlDigit(digits);
        return result;
    }

    const checkPid = (pid) => {
        let pidStr = pid;
        if (!/^[1-6]/.test(pid)) {
            return "Neteisingas šimtmečio skaičius!";
        };
        let praejeSimtmeciai = pid.charAt(0);
        switch (praejeSimtmeciai) {
            case "1":
            case "2":
                praejeSimtmeciai = "18";
                break;
            case "3":
            case "4":
                praejeSimtmeciai = "19";
                break;
            case "5":
            case "6":
                praejeSimtmeciai = "20";
                break;
        }

        pidStr = pid.slice(1);

        const amzMetai = parseInt(`${praejeSimtmeciai}${pidStr.slice(0, 2)}`);
        const menuo = parseInt(pidStr.slice(2, 4));

        if (menuo < 1 || menuo > 12) {
            return "Neteisingi mėnesio skaitmenys!";
        }

        const diena = parseInt(pidStr.slice(4, 6));
        const menDienuSk = getDaysInMonth(amzMetai, menuo);

        if (diena < 1 || diena > menDienuSk) {
            return "Neteisingi dienos skaitmenys!";
        }

        const result = checkControlSum(pid);
        return result;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.checkValidity()) {
            const checkResult = checkPid(ak.value);
            ak.setCustomValidity(checkResult);
        }
        if (!form.checkValidity()) {
            if (!ak.validity.valid) {
                feedback.innerText = validationMessage(ak);
            }
            event.stopPropagation();
        }

        form.classList.add('was-validated');

    }, false);
})();