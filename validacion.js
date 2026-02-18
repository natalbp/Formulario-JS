let usuario = document.getElementById("usuario")
let mensaje = document.getElementById("mensaje")
let password = document.getElementById("password")
let mensaje2 = document.getElementById("mensaje2")
let contador = document.getElementById("contador")
let form = document.querySelector("form")
let toggle = document.getElementById("togglePassword")

usuario.addEventListener("input", function () {
   const original = this.value
   this.value = this.value.toLowerCase()


   if (/[!@#$%^&*(),?":{}|<>]/.test(original)) {
      mensaje.textContent = "Caracteres especiales no permitidos"
      this.style.borderColor = "red"
   }


   this.value = this.value.replace(/[^a-z0-9.-]/g, "")

   if (this.value.length === 0) {
      mensaje.textContent = "Campo requerido"
      this.style.borderColor = ""
   } else if (this.value.length < 3) {
      mensaje.textContent = "El nombre de usuario debe tener al menos 3 caracteres"
      this.style.borderColor = "red"
   } else {
      mensaje.textContent = "Usuario correcto"
      this.style.borderColor = "green"
   }
})

password.addEventListener("input", function () {
   contador.textContent = this.value.length
   if (this.value.length < 10) {
      mensaje2.textContent = "Contraseña debe tener al menos 10 caracteres"
      this.style.borderColor = "red"
   } else {
      mensaje2.textContent = "Contraseña válida"
      this.style.borderColor = "green"
   }
})


   form.addEventListener("submit", function (e) {
         e.preventDefault()
      })
   
if (toggle && password) {
   toggle.addEventListener('click', () => {
      const showing = password.type === 'text'
      password.type = showing ? 'password' : 'text'
      toggle.textContent = showing ? 'Mostrar' : 'Ocultar'
   })
}