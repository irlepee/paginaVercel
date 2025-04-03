const sendMessage = document.getElementById("send-message");
const message = document.getElementById("mensaje");
const name = document.getElementById("nombre");
const email = document.getElementById("correo");

sendMessage.addEventListener("click", (e) => {
  e.preventDefault();
  const messageValue = message.value;
  const nameValue = name.value;
  const emailValue = email.value;

  if (messageValue === "" || nameValue === "" || emailValue === "") {
    alert("Por favor, completa todos los campos");
  } else {
    alert(`Mensaje enviado con exito! \n\nNombre: ${nameValue} \nCorreo: ${emailValue} \nMensaje: ${messageValue}`);
    message.value = "";
    name.value = "";
    email.value = "";
  }
});