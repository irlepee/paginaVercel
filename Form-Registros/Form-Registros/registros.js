document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm")
  const nombreInput = document.getElementById("nombre")
  const edadInput = document.getElementById("edad")
  const correoInput = document.getElementById("correo")
  const usuarioInput = document.getElementById("usuario")
  const passwordInput = document.getElementById("password")
  const confirmarPasswordInput = document.getElementById("confirmarPassword")
  const togglePassword = document.getElementById("togglePassword")
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword")
  const enviarBtn = document.getElementById("enviarBtn")
  const cancelarBtn = document.getElementById("cancelarBtn")

  //Mensajes de error qu3 se mostraran
  const mensajes = {
    nombre: "Solo letras y espacios",
    edad: "Solo números entre 1 y 99",
    correo: "Formato válido (ejemplo@dominio.com)",
    usuario: "Solo letras y números, mínimo 5 caracteres, sin espacios",
    password: "Mínimo 8 caracteres, al menos una letra, un número y un símbolo especial",
    confirmarPassword: "Las contraseñas deben coincidir",
  }

  //Expresiones regulares para la validacion
  const regexNombre = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/
  const regexEdad = /^[1-9][0-9]?$/
  const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const regexUsuario = /^[a-zA-Z0-9]{5,}$/
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_\-#])[A-Za-z\d@$!%*?&_\-#]{8,}$/

  //Mostrar/ocultar contraseña
  togglePassword.addEventListener("click", function () {
    const tipo = passwordInput.type === "password" ? "text" : "password"
    passwordInput.type = tipo
    this.classList.toggle("password-visible")
  })

  toggleConfirmPassword.addEventListener("click", function () {
    const tipo = confirmarPasswordInput.type === "password" ? "text" : "password"
    confirmarPasswordInput.type = tipo
    this.classList.toggle("password-visible")
  })

  //Function para validar todos los campos del registro
  function validarCampos() {
    let errores = false

    //Validar el nombre
    if (!regexNombre.test(nombreInput.value)) {
      marcarError(nombreInput, mensajes.nombre)
      errores = true
    } else {
      quitarError(nombreInput)
    }

    //Validar la edad
    if (!regexEdad.test(edadInput.value)) {
      marcarError(edadInput, mensajes.edad)
      errores = true
    } else {
      quitarError(edadInput)
    }

    //Validar correo
    if (!regexCorreo.test(correoInput.value)) {
      marcarError(correoInput, mensajes.correo)
      errores = true
    } else {
      quitarError(correoInput)
    }

    //Validar usuario
    if (!regexUsuario.test(usuarioInput.value)) {
      marcarError(usuarioInput, mensajes.usuario)
      errores = true
    } else {
      quitarError(usuarioInput)
    }

    //Validar contraseña
    if (!regexPassword.test(passwordInput.value)) {
      marcarError(passwordInput, mensajes.password)
      errores = true
    } else {
      quitarError(passwordInput)
    }

    //Validar la confirmacion de contraseña
    if (passwordInput.value !== confirmarPasswordInput.value) {
      marcarError(confirmarPasswordInput, mensajes.confirmarPassword)
      errores = true
    } else {
      quitarError(confirmarPasswordInput)
    }

    return !errores
  }

  //Function para mostrar la informacion del usuario
  function mostrarInformacionUsuario(nombre, edad, correo, usuario, password, passwordEncriptado) {
    const modal = document.getElementById("modal")

    //Actualizar la información en el modal
    document.getElementById("modalNombre").textContent = nombre
    document.getElementById("modalEdad").textContent = edad
    document.getElementById("modalCorreo").textContent = correo
    document.getElementById("modalUsuario").textContent = usuario
    document.getElementById("modalPassword").textContent = password
    document.getElementById("modalPasswordEnc").textContent = passwordEncriptado

    //Mostrar el modal
    modal.style.display = "block"

    //Cerrar el modal al hacer clic en el botón cerrar
    document.getElementById("cerrarModal").onclick = () => {
      modal.style.display = "none"
      //Limpiar el formulario después de cerrar el modal
      form.reset()
      //Resetear los iconos de contraseña
      togglePassword.classList.remove("password-visible")
      toggleConfirmPassword.classList.remove("password-visible")
    }

    //Cerrar el modal al hacer clic fuera de él
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none"
        //Limpiar el formulario después de cerrar el modal
        form.reset()
        //Resetear los iconos de contraseña
        togglePassword.classList.remove("password-visible")
        toggleConfirmPassword.classList.remove("password-visible")
      }
    }
  }

  //Function para marcar un campo con error
  function marcarError(input, mensaje) {
    const formGroup = input.closest(".form-group")
    formGroup.classList.add("error")
    const errorMessage = formGroup.querySelector(".error-message")
    errorMessage.textContent = mensaje
  }

  //Function para quitar el error de un campo
  function quitarError(input) {
    const formGroup = input.closest(".form-group")
    formGroup.classList.remove("error")
    const errorMessage = formGroup.querySelector(".error-message")
    errorMessage.textContent = ""
  }

  async function encriptarPassword(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return hashHex
  }
  
  //Evento para el boton Enviar
  enviarBtn.addEventListener("click", async () => {
    const esValido = validarCampos();
  
    if (esValido) {
      const passwordEncriptado = await encriptarPassword(passwordInput.value);
  
      mostrarInformacionUsuario(
        nombreInput.value,
        edadInput.value,
        correoInput.value,
        usuarioInput.value,
        passwordInput.value,
        passwordEncriptado
      );
    }
  });
  

  cancelarBtn.addEventListener("click", () => {
    if (confirm("¿Está seguro que desea cancelar? Se borrarán todos los datos ingresados.")) {
      form.reset()

      //Quitar todos los errores
      const formGroups = form.querySelectorAll(".form-group")
      formGroups.forEach((group) => {
        group.classList.remove("error")
        const errorMessage = group.querySelector(".error-message")
        if (errorMessage) {
          errorMessage.textContent = ""
        }
      })
      togglePassword.classList.remove("password-visible")
      toggleConfirmPassword.classList.remove("password-visible")
    }
  })

  //Validar en tiempo real al escribir para quitar errores cuando se corrigen
  const inputs = [nombreInput, edadInput, correoInput, usuarioInput, passwordInput, confirmarPasswordInput]
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      //Solo quitaran los errores si el campo ahora es valido
      if (index === 0 && regexNombre.test(input.value)) {
        quitarError(input)
      } else if (index === 1 && regexEdad.test(input.value)) {
        quitarError(input)
      } else if (index === 2 && regexCorreo.test(input.value)) {
        quitarError(input)
      } else if (index === 3 && regexUsuario.test(input.value)) {
        quitarError(input)
      } else if (index === 4 && regexPassword.test(input.value)) {
        quitarError(input)

        //Si la contraseña es valida despues se verifica tambien la confirmación
        if (input.value === confirmarPasswordInput.value) {
          quitarError(confirmarPasswordInput)
        }
      } else if (index === 5 && input.value === passwordInput.value) {
        quitarError(input)
      }
    })
  })
})