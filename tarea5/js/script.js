// Selección de elementos
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
let colorFuente = document.querySelector("#colorFuente");
let rangeTamañoFuente = document.querySelector("#rangeTamañoFuente");
let colorFondoFuente = document.querySelector("#colorFondoFuente");

// Elementos de previsualización
let enlaceTest = document.querySelector("#a_test");
let imagenTest = document.querySelector("#img_test");
let tablaTest = document.querySelector("table");
let parrafoTest = document.querySelector(".previsualizacion3 p");

// Botón para restablecer configuraciones
let botonRestablecer = document.querySelector(".indice:last-child div:last-child p");

// Valores por defecto (tomados del HTML)
const valoresPorDefecto = {
    colorFondo: "#222222",
    rangeRedondearEnlace: "10",
    colorFondoEnlace: "#296b9d",
    colorEnlace: "#ffffff",
    selectTamañoImagen: "50%",
    rangeGrosorImagen: "3",
    colorContornoImagen: "#ffffff",
    rangeRedondearImagen: "10",
    selectSombraImagen: "No",
    colorBordeTabla: "#ffffff",
    colorFondoTabla: "#13324a",
    colorCeldaTabla: "#13324a",
    colorFuente: "#ffffff",
    rangeTamañoFuente: "20",
    colorFondoFuente: "" // No tiene valor por defecto en el HTML
};

// Función para guardar todas las configuraciones en una cookie
function guardarConfiguraciones() {
    // Crear un objeto con todas las configuraciones
    const configuraciones = {
        colorFondo: colorFondo.value,
        rangeRedondearEnlace: rangeRedondearEnlace.value,
        colorFondoEnlace: colorFondoEnlace.value,
        colorEnlace: colorEnlace.value,
        selectTamañoImagen: selectTamañoImagen.value,
        rangeGrosorImagen: rangeGrosorImagen.value,
        colorContornoImagen: colorContornoImagen.value,
        rangeRedondearImagen: rangeRedondearImagen.value,
        selectSombraImagen: selectSombraImagen.value,
        colorBordeTabla: colorBordeTabla.value,
        colorFondoTabla: colorFondoTabla.value,
        colorCeldaTabla: colorCeldaTabla.value,
        colorFuente: colorFuente.value,
        rangeTamañoFuente: rangeTamañoFuente.value,
        colorFondoFuente: colorFondoFuente.value
    };
    
    // Convertir el objeto a string JSON
    const configuracionesJSON = JSON.stringify(configuraciones);
    
    // Establecer fecha de expiración (30 días)
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    // Guardar en cookie
    document.cookie = `configuracionesPagina=${encodeURIComponent(configuracionesJSON)}; expires=${fechaExpiracion.toUTCString()}; path=/`;
}

// Función para obtener el valor de una cookie por su nombre
function obtenerCookie(nombre) {
    const nombreEQ = nombre + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nombreEQ) === 0) {
            return decodeURIComponent(cookie.substring(nombreEQ.length, cookie.length));
        }
    }
    return null;
}

// Función para eliminar una cookie
function eliminarCookie(nombre) {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Función para cargar las configuraciones desde la cookie
function cargarConfiguraciones() {
    const configuracionesGuardadas = obtenerCookie("configuracionesPagina");
    
    if (configuracionesGuardadas) {
        try {
            const configuraciones = JSON.parse(configuracionesGuardadas);
            
            // Aplicar cada configuración si existe
            if (configuraciones.colorFondo) {
                colorFondo.value = configuraciones.colorFondo;
                document.body.style.backgroundColor = configuraciones.colorFondo;
            }
            
            if (configuraciones.rangeRedondearEnlace) {
                rangeRedondearEnlace.value = configuraciones.rangeRedondearEnlace;
                document.querySelectorAll("a").forEach(a => {
                    a.style.borderRadius = configuraciones.rangeRedondearEnlace + "px";
                });
            }
            
            if (configuraciones.colorFondoEnlace) {
                colorFondoEnlace.value = configuraciones.colorFondoEnlace;
                document.querySelectorAll("a").forEach(a => {
                    a.style.backgroundColor = configuraciones.colorFondoEnlace;
                });
            }
            
            if (configuraciones.colorEnlace) {
                colorEnlace.value = configuraciones.colorEnlace;
                document.querySelectorAll("a").forEach(a => {
                    a.style.color = configuraciones.colorEnlace;
                });
            }
            
            if (configuraciones.selectTamañoImagen) {
                selectTamañoImagen.value = configuraciones.selectTamañoImagen;
                document.querySelectorAll("img").forEach(img => {
                    img.style.width = configuraciones.selectTamañoImagen;
                });
            }
            
            if (configuraciones.rangeGrosorImagen) {
                rangeGrosorImagen.value = configuraciones.rangeGrosorImagen;
                document.querySelectorAll("img").forEach(img => {
                    img.style.borderWidth = configuraciones.rangeGrosorImagen + "px";
                    img.style.borderStyle = "solid";
                });
            }
            
            if (configuraciones.colorContornoImagen) {
                colorContornoImagen.value = configuraciones.colorContornoImagen;
                document.querySelectorAll("img").forEach(img => {
                    img.style.borderColor = configuraciones.colorContornoImagen;
                });
            }
            
            if (configuraciones.rangeRedondearImagen) {
                rangeRedondearImagen.value = configuraciones.rangeRedondearImagen;
                document.querySelectorAll("img").forEach(img => {
                    img.style.borderRadius = configuraciones.rangeRedondearImagen + "px";
                });
            }
            
            if (configuraciones.selectSombraImagen) {
                selectSombraImagen.value = configuraciones.selectSombraImagen;
                document.querySelectorAll("img").forEach(img => {
                    if (configuraciones.selectSombraImagen === "Si") {
                        img.style.boxShadow = "10px 10px 40px rgba(0, 0, 0, 0.8)";
                    } else {
                        img.style.boxShadow = "none";
                    }
                });
            }
            
            if (configuraciones.colorBordeTabla) {
                colorBordeTabla.value = configuraciones.colorBordeTabla;
                document.querySelectorAll("table").forEach(table => {
                    table.style.borderColor = configuraciones.colorBordeTabla;
                    table.style.borderStyle = "solid";
                    table.style.borderWidth = "1px";
                    
                    table.querySelectorAll("td, th").forEach(cell => {
                        cell.style.borderColor = configuraciones.colorBordeTabla;
                        cell.style.borderStyle = "solid";
                        cell.style.borderWidth = "1px";
                    });
                });
            }
            
            if (configuraciones.colorFondoTabla) {
                colorFondoTabla.value = configuraciones.colorFondoTabla;
                document.querySelectorAll("table").forEach(table => {
                    table.style.backgroundColor = configuraciones.colorFondoTabla;
                });
            }
            
            if (configuraciones.colorCeldaTabla) {
                colorCeldaTabla.value = configuraciones.colorCeldaTabla;
                document.querySelectorAll("th").forEach(header => {
                    header.style.backgroundColor = configuraciones.colorCeldaTabla;
                });
            }
            
            if (configuraciones.colorFuente) {
                colorFuente.value = configuraciones.colorFuente;
                document.querySelectorAll("p, h1, h2, h3").forEach(el => {
                    el.style.color = configuraciones.colorFuente;
                });
            }
            
            if (configuraciones.rangeTamañoFuente) {
                rangeTamañoFuente.value = configuraciones.rangeTamañoFuente;
                document.querySelectorAll("p, h1, h2, h3").forEach(el => {
                    el.style.fontSize = configuraciones.rangeTamañoFuente + "px";
                });
            }
            
            if (configuraciones.colorFondoFuente) {
                colorFondoFuente.value = configuraciones.colorFondoFuente;
                document.querySelectorAll("p, h1, h2, h3").forEach(el => {
                    el.style.backgroundColor = configuraciones.colorFondoFuente;
                });
            }
            
        } catch (error) {
            console.error("Error al cargar configuraciones:", error);
            // Si hay un error, restablecer a valores por defecto
            restablecerConfiguraciones();
        }
    } else {
        // Si no hay configuraciones guardadas, aplicar los valores por defecto
        aplicarValoresPorDefecto();
    }
}

// Función para aplicar los valores por defecto
function aplicarValoresPorDefecto() {
    // Color de fondo
    colorFondo.value = valoresPorDefecto.colorFondo;
    document.body.style.backgroundColor = valoresPorDefecto.colorFondo;
    
    // Enlaces
    rangeRedondearEnlace.value = valoresPorDefecto.rangeRedondearEnlace;
    colorFondoEnlace.value = valoresPorDefecto.colorFondoEnlace;
    colorEnlace.value = valoresPorDefecto.colorEnlace;
    document.querySelectorAll("a").forEach(a => {
        a.style.borderRadius = valoresPorDefecto.rangeRedondearEnlace + "px";
        a.style.backgroundColor = valoresPorDefecto.colorFondoEnlace;
        a.style.color = valoresPorDefecto.colorEnlace;
    });
    
    // Imágenes
    selectTamañoImagen.value = valoresPorDefecto.selectTamañoImagen;
    rangeGrosorImagen.value = valoresPorDefecto.rangeGrosorImagen;
    colorContornoImagen.value = valoresPorDefecto.colorContornoImagen;
    rangeRedondearImagen.value = valoresPorDefecto.rangeRedondearImagen;
    selectSombraImagen.value = valoresPorDefecto.selectSombraImagen;
    document.querySelectorAll("img").forEach(img => {
        img.style.width = valoresPorDefecto.selectTamañoImagen;
        img.style.borderWidth = valoresPorDefecto.rangeGrosorImagen + "px";
        img.style.borderStyle = "solid";
        img.style.borderColor = valoresPorDefecto.colorContornoImagen;
        img.style.borderRadius = valoresPorDefecto.rangeRedondearImagen + "px";
        img.style.boxShadow = valoresPorDefecto.selectSombraImagen === "Si" ? 
            "10px 10px 40px rgba(0, 0, 0, 0.8)" : "none";
    });
    
    // Tablas
    colorBordeTabla.value = valoresPorDefecto.colorBordeTabla;
    colorFondoTabla.value = valoresPorDefecto.colorFondoTabla;
    colorCeldaTabla.value = valoresPorDefecto.colorCeldaTabla;
    document.querySelectorAll("table").forEach(table => {
        table.style.borderColor = valoresPorDefecto.colorBordeTabla;
        table.style.borderStyle = "solid";
        table.style.borderWidth = "1px";
        table.style.backgroundColor = valoresPorDefecto.colorFondoTabla;
        
        table.querySelectorAll("td, th").forEach(cell => {
            cell.style.borderColor = valoresPorDefecto.colorBordeTabla;
            cell.style.borderStyle = "solid";
            cell.style.borderWidth = "1px";
        });
        
        table.querySelectorAll("th").forEach(header => {
            header.style.backgroundColor = valoresPorDefecto.colorCeldaTabla;
        });
    });
    
    // Fuentes
    colorFuente.value = valoresPorDefecto.colorFuente;
    rangeTamañoFuente.value = valoresPorDefecto.rangeTamañoFuente;
    colorFondoFuente.value = valoresPorDefecto.colorFondoFuente;
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.color = valoresPorDefecto.colorFuente;
        el.style.fontSize = valoresPorDefecto.rangeTamañoFuente + "px";
        el.style.backgroundColor = valoresPorDefecto.colorFondoFuente;
    });
}

// Función para restablecer las configuraciones
function restablecerConfiguraciones() {
    // Eliminar la cookie
    eliminarCookie("configuracionesPagina");
    
    // Aplicar valores por defecto
    aplicarValoresPorDefecto();
}

// Modificar los event listeners para guardar configuraciones después de cada cambio
colorFondo.addEventListener("input", function () {
    document.body.style.backgroundColor = colorFondo.value;
    guardarConfiguraciones();
});

colorFondoEnlace.addEventListener("input", function () {
    document.querySelectorAll("a").forEach(a => {
        a.style.backgroundColor = colorFondoEnlace.value;
    });
    guardarConfiguraciones();
});

colorEnlace.addEventListener("input", function () {
    document.querySelectorAll("a").forEach(a => {
        a.style.color = colorEnlace.value;
    });
    guardarConfiguraciones();
});

rangeRedondearEnlace.addEventListener("input", function () {
    document.querySelectorAll("a").forEach(a => {
        a.style.borderRadius = rangeRedondearEnlace.value + "px";
    });
    guardarConfiguraciones();
});

selectTamañoImagen.addEventListener("change", function () {
    let tamaño = selectTamañoImagen.value;
    document.querySelectorAll("img").forEach(img => {
        img.style.width = tamaño;
    });
    guardarConfiguraciones();
});

colorContornoImagen.addEventListener("input", function () {
    document.querySelectorAll("img").forEach(img => {
        img.style.borderColor = colorContornoImagen.value;
    });
    guardarConfiguraciones();
});

rangeGrosorImagen.addEventListener("input", function () {
    document.querySelectorAll("img").forEach(img => {
        img.style.borderWidth = rangeGrosorImagen.value + "px";
        img.style.borderStyle = "solid";
    });
    guardarConfiguraciones();
});

rangeRedondearImagen.addEventListener("input", function () {
    document.querySelectorAll("img").forEach(img => {
        img.style.borderRadius = rangeRedondearImagen.value + "px";
    });
    guardarConfiguraciones();
});

selectSombraImagen.addEventListener("change", function () {
    document.querySelectorAll("img").forEach(img => {
        if (selectSombraImagen.value === "Si") {
            img.style.boxShadow = "10px 10px 40px rgba(0, 0, 0, 0.8)";
        } else {
            img.style.boxShadow = "none";
        }
    });
    guardarConfiguraciones();
});

colorBordeTabla.addEventListener("input", function () {
    document.querySelectorAll("table").forEach(table => {
        table.style.borderColor = colorBordeTabla.value;
        table.style.borderStyle = "solid";
        table.style.borderWidth = "1px";
        
        table.querySelectorAll("td, th").forEach(cell => {
            cell.style.borderColor = colorBordeTabla.value;
            cell.style.borderStyle = "solid";
            cell.style.borderWidth = "1px";
        });
    });
    guardarConfiguraciones();
});

colorFondoTabla.addEventListener("input", function () {
    document.querySelectorAll("table").forEach(table => {
        table.style.backgroundColor = colorFondoTabla.value;
    });
    guardarConfiguraciones();
});

colorCeldaTabla.addEventListener("input", function () {
    document.querySelectorAll("th").forEach(header => {
        header.style.backgroundColor = colorCeldaTabla.value;
    });
    guardarConfiguraciones();
});

colorFuente.addEventListener("input", function () {
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.color = colorFuente.value;
    });
    guardarConfiguraciones();
});

colorFondoFuente.addEventListener("input", function () {
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.backgroundColor = colorFondoFuente.value;
    });
    guardarConfiguraciones();
});

rangeTamañoFuente.addEventListener("input", function () {
    document.querySelectorAll("p, h1, h2, h3").forEach(el => {
        el.style.fontSize = rangeTamañoFuente.value + "px";
    });
    guardarConfiguraciones();
});

// Añadir evento para restablecer configuraciones
botonRestablecer.addEventListener("click", function() {
    restablecerConfiguraciones();
});

// Cargar configuraciones al iniciar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarConfiguraciones();
});