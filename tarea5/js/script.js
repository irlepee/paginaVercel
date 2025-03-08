let colorFondo = document.querySelector("#colorFondo");

let rangeRedondearEnlace = document.querySelector("#rangeRedondearEnlace");
let colorFondoEnlace = document.querySelector("#colorFondoEnlace");
let colorEnlace = document.querySelector("#colorEnlace");

let selectTamañoImagen = document.querySelector("#selectTamañoImagen");
let rangeGrosorImagen = document.querySelector("#rangeGrosorImagen");
let colorContornoImagen = document.querySelector("#colorContornoImagen");
let rangeRedondearImagen = document.querySelector("#rangeRedondearImagen");
let selectSombraImagen = document.querySelector("#selectSombraImagen");

let colorBordeTabla = document.querySelector("#colorBordeTabla");
let colorFondoTabla = document.querySelector("#colorFondoTabla");
let colorCeldaTabla = document.querySelector("#colorCeldaTabla");

let colorFuente = document.querySelector("#colorFuente"); // Corregido para el texto de la página
let rangeTamañoFuente = document.querySelector("#rangeTamañoFuente");
let colorFondoFuente = document.querySelector("#colorFondoFuente");

colorFondo.addEventListener("input", function () {
    document.body.style.backgroundColor = colorFondo.value;
});

colorFondoEnlace.addEventListener("input", function () {
    document.querySelectorAll("a").forEach(a => {
        a.style.backgroundColor = colorFondoEnlace.value;
    });
});

colorEnlace.addEventListener("input", function () {
    document.querySelectorAll("a").forEach(a => {
        a.style.color = colorEnlace.value;
    });
});

rangeRedondearEnlace.addEventListener("input", function () {
    document.querySelectorAll("a").forEach(a => {
        a.style.borderRadius = rangeRedondearEnlace.value + "px";
    });
});

colorContornoImagen.addEventListener("input", function () {
    document.querySelectorAll("img").forEach(img => {
        img.style.borderColor = colorContornoImagen.value;
    });
});

rangeGrosorImagen.addEventListener("input", function () {
    document.querySelectorAll("img").forEach(img => {
        img.style.borderWidth = rangeGrosorImagen.value + "px";
        img.style.borderStyle = "solid"; // Para asegurarnos de que el borde sea visible
    });
});

rangeRedondearImagen.addEventListener("input", function () {
    document.querySelectorAll("img").forEach(img => {
        img.style.borderRadius = rangeRedondearImagen.value + "px";
    });
});

selectSombraImagen.addEventListener("change", function () {
    document.querySelectorAll("img").forEach(img => {
        if (selectSombraImagen.value === "Si") {
            img.style.boxShadow = "10px 10px 40px rgba(0, 0, 0, 0.8)";  // Sombra más notoria
        } else {
            img.style.boxShadow = "none";  // Sin sombra
        }
    });
});

colorBordeTabla.addEventListener("input", function () {
    document.querySelectorAll("table").forEach(table => {
        table.style.borderColor = colorBordeTabla.value;
    });
});

colorFondoTabla.addEventListener("input", function () {
    document.querySelectorAll("table").forEach(table => {
        table.style.backgroundColor = colorFondoTabla.value;
    });
});

// Solo cambiar el color de fondo de las celdas de la tabla
colorCeldaTabla.addEventListener("input", function () {
    document.querySelectorAll("td, th").forEach(cell => {
        cell.style.backgroundColor = colorCeldaTabla.value;
    });
});

// Cambiar el color del texto de la página
colorFuente.addEventListener("input", function () {
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.color = colorFuente.value;
    });
});

// Cambiar el fondo de los textos
colorFondoFuente.addEventListener("input", function () {
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.backgroundColor = colorFondoFuente.value;
    });
});

// Cambiar tamaño de fuente
rangeTamañoFuente.addEventListener("input", function () {
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.fontSize = rangeTamañoFuente.value + "px";
    });
});
