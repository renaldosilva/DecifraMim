const cryptography = new Map([
    ['e', 'enter'],
    ['i', 'imes'],
    ['a', 'ai'],
    ['o', 'ober'],
    ['u', 'ufat']
]);


function copyToClipboard() {
    const text = document.getElementById('result-textarea').value;
    navigator.clipboard.writeText(text);
}

function processText(action) {
    const textArea = document.getElementById('input-textarea');
    let text = textArea.value;

    if (!isValidText(text)) {
        shakeWarningMessage();
    } else {
        text = action(text); 
        showEncryptedText(text);
    }

    if (isTextEmptyOrWhitespace(text)) {
        shakeHelpMessage();
    }
}

function encrypt() {
    processText(encryptText);
}

function decrypt() {
    processText(decryptText);
}

function encryptText(text) {
    for (const [caractere, encryptedText] of cryptography) {
        text = text.replaceAll(caractere, encryptedText);
    }
    return text;
}

function decryptText(text) {
    for (const [caractere, encryptedText] of cryptography) {
        text = text.replaceAll(encryptedText, caractere);
    }
    return text;
}

function showEncryptedText(text) {
    changeVisibilityOfResponseAreaElements(text);

    let textResult = document.getElementById('result-textarea');
    textResult.value = text;
}

function changeVisibilityOfResponseAreaElements(text) {
    const elements = {
        boxTextResult: document.querySelector('.container__box__text__result'),
        image: document.querySelector('.container__encrypt__result__output__image'),
        helpMessage: document.querySelector('.container__encrypt__result__output__help__message'),
        copyButton: document.querySelector('.container__encrypt__result__output__button')
    };

    const classTarget = 'hidden';
    const isTextEmpty = isTextEmptyOrWhitespace(text);

    elements.boxTextResult.classList.toggle(classTarget, isTextEmpty);
    elements.image.classList.toggle(classTarget, !isTextEmpty);
    elements.helpMessage.classList.toggle(classTarget, !isTextEmpty);
    elements.copyButton.classList.toggle(classTarget, isTextEmpty);
}

function shakeWarningMessage() {
    const warningMessage = document.querySelector('.container__encrypt__input__box__warning__message');
    warningMessage.classList.add('shake');

    setTimeout(() => {
        warningMessage.classList.remove('shake');
    }, 500);
}

function shakeHelpMessage() {
    const helpMessage = document.querySelector('.container__encrypt__result__output__help__message');
    helpMessage.classList.add('shake');

    setTimeout(() => {
        helpMessage.classList.remove('shake');
    }, 500);
}

function isValidText(text) {
    return /^[a-z\s.,!?ç]*$/.test(text);
}

function isTextEmptyOrWhitespace(text) {
    return text.trim().length === 0;
}
