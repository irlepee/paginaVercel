// config-loader.js

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

// Función para aplicar las configuraciones guardadas
function aplicarConfiguraciones() {
    const configuracionesGuardadas = obtenerCookie("configuracionesPagina");
    
    if (configuracionesGuardadas) {
        try {
            const configuraciones = JSON.parse(configuracionesGuardadas);
            
            // Aplicar color de fondo
            if (configuraciones.colorFondo) {
                document.body.style.backgroundColor = configuraciones.colorFondo;
            }
            
            // Aplicar estilos a los enlaces
            if (configuraciones.rangeRedondearEnlace || configuraciones.colorFondoEnlace || configuraciones.colorEnlace) {
                document.querySelectorAll("a").forEach(a => {
                    if (configuraciones.rangeRedondearEnlace) {
                        a.style.borderRadius = configuraciones.rangeRedondearEnlace + "px";
                    }
                    if (configuraciones.colorFondoEnlace) {
                        a.style.backgroundColor = configuraciones.colorFondoEnlace;
                    }
                    if (configuraciones.colorEnlace) {
                        a.style.color = configuraciones.colorEnlace;
                    }
                });
            }
            
            // Aplicar estilos a las imágenes
            if (configuraciones.selectTamañoImagen || configuraciones.rangeGrosorImagen || 
                configuraciones.colorContornoImagen || configuraciones.rangeRedondearImagen || 
                configuraciones.selectSombraImagen) {
                
                document.querySelectorAll("img").forEach(img => {
                    if (configuraciones.selectTamañoImagen) {
                        img.style.width = configuraciones.selectTamañoImagen;
                    }
                    if (configuraciones.rangeGrosorImagen) {
                        img.style.borderWidth = configuraciones.rangeGrosorImagen + "px";
                        img.style.borderStyle = "solid";
                    }
                    if (configuraciones.colorContornoImagen) {
                        img.style.borderColor = configuraciones.colorContornoImagen;
                    }
                    if (configuraciones.rangeRedondearImagen) {
                        img.style.borderRadius = configuraciones.rangeRedondearImagen + "px";
                    }
                    if (configuraciones.selectSombraImagen) {
                        if (configuraciones.selectSombraImagen === "Si") {
                            img.style.boxShadow = "10px 10px 40px rgba(0, 0, 0, 0.8)";
                        } else {
                            img.style.boxShadow = "none";
                        }
                    }
                });
            }
            
            // Aplicar estilos a las tablas
            if (configuraciones.colorBordeTabla || configuraciones.colorFondoTabla || configuraciones.colorCeldaTabla) {
                document.querySelectorAll("table").forEach(table => {
                    if (configuraciones.colorBordeTabla) {
                        table.style.borderColor = configuraciones.colorBordeTabla;
                        table.style.borderStyle = "solid";
                        table.style.borderWidth = "1px";
                        
                        table.querySelectorAll("td, th").forEach(cell => {
                            cell.style.borderColor = configuraciones.colorBordeTabla;
                            cell.style.borderStyle = "solid";
                            cell.style.borderWidth = "1px";
                        });
                    }
                    
                    if (configuraciones.colorFondoTabla) {
                        table.style.backgroundColor = configuraciones.colorFondoTabla;
                    }
                });
                
                if (configuraciones.colorCeldaTabla) {
                    document.querySelectorAll("th").forEach(header => {
                        header.style.backgroundColor = configuraciones.colorCeldaTabla;
                    });
                }
            }
            
            // Aplicar estilos a los textos
            if (configuraciones.colorFuente || configuraciones.rangeTamañoFuente || configuraciones.colorFondoFuente) {
                document.querySelectorAll("p, h1, h2, h3").forEach(el => {
                    if (configuraciones.colorFuente) {
                        el.style.color = configuraciones.colorFuente;
                    }
                    if (configuraciones.rangeTamañoFuente) {
                        el.style.fontSize = configuraciones.rangeTamañoFuente + "px";
                    }
                    if (configuraciones.colorFondoFuente) {
                        el.style.backgroundColor = configuraciones.colorFondoFuente;
                    }
                });
            }
            
        } catch (error) {
            console.error("Error al aplicar configuraciones:", error);
        }
    }
}

// Aplicar configuraciones cuando la página se carga
document.addEventListener("DOMContentLoaded", aplicarConfiguraciones);