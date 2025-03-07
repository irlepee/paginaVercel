const titleColorPicker = document.getElementById('Titulo');
const textColorPicker = document.getElementById('Texto');
const previewTitle = document.getElementById('preview-titulo');
const previewText = document.getElementById('preview-text');

// RADIO BUTTONS //
const radioButtonFont = document.querySelectorAll('input[name="template"]');
const titleFont = document.querySelector('#preview-titulo');
const textFont = document.querySelector('#preview-text');

radioButtonFont.forEach(option => option.addEventListener('change', () => actualizarFont(option)));

function actualizarFont(selectedRadioButton) {
    titleFont.style.fontFamily = `${selectedRadioButton.value}, serif`;
    textFont.style.fontFamily = `${selectedRadioButton.value}, serif`;
}

// CHECK-BOX //
const checkbox_bold = document.getElementById("check-bold");
const checkbox_italic = document.getElementById("check-italic");
const checkbox_underline = document.getElementById("check-underline");

checkbox_bold.addEventListener("change", modificarEstiloBold);
checkbox_italic.addEventListener("change", modificarEstiloItalic);
checkbox_underline.addEventListener("change", modificarEstiloUnderline);

function modificarEstiloBold() {
    if (previewText.style.fontWeight === "bold") {
        previewText.style.fontWeight = "normal";
    } else {
        previewText.style.fontWeight = "bold";
    }
}

function modificarEstiloItalic() {
    
    if (previewText.style.fontStyle == "italic") {
        previewText.style.fontStyle = "normal";
    } else {
        previewText.style.fontStyle = "italic";
    }
}

function modificarEstiloUnderline() {
    if (previewText.style.textDecoration == "underline") {
        previewText.style.textDecoration = "none";
    } else {
        previewText.style.textDecoration = "underline";
    }
}

// COLORES //
function ActualizarPreview() {
    const titleColor = titleColorPicker.value;
    const textColor = textColorPicker.value;

    previewTitle.style.color = titleColor;
    previewText.style.color = textColor;
}

titleColorPicker.addEventListener('input', ActualizarPreview);
textColorPicker.addEventListener('input', ActualizarPreview);

ActualizarPreview();

