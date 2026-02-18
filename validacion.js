let usuario = document.getElementById("usuario")
let mensaje = document.getElementById("mensaje")
let password = document.getElementById("password")

 usuario.addEventListener("input",function(evento){
   this.value = this.value.toLowerCase()
   if(/[^a-z]/g.test(this.value)){
      mensaje.textContent ="Esta tratando de ingresar un valor incorrecto"
      this.style.borderColor = "red"
      this.borderColor = "2px solid"
   }
   else if (this.value){
      mensaje.textContent = "Usuario correcto"
      this.style.borderColor = "green"
      this.borderColor = "2px solid"
   }
   else{
      mensaje.textContent ="Campo requerido"
   }
   this.value = this.value.replace(/[^a-z]/g,"")

 })

 password.addEventListener("input",function(evento){
   if(this.value.length < 10){
      mensaje2.textContent = "Contraseña debe tener al menos 10 caracteres"
      this.style.borderColor = "red"
      this.borderColor = "2px solid"
   }else{
      mensaje2.textContent = "Contraseña válida"
      this.style.borderColor = "green"
      this.borderColor = "2px solid"
   }
})
