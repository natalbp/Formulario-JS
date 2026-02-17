let usuario = document.getElementById("usuario")
let mensaje = document.getElementById("mensaje")
 usuario.addEventListener("input",function(evento){
   this.value = this.value.toLowerCase()
   if(/[^a-z]/g.test(this.value)){
      mensaje.textContent ="Esta tratando de ingresar un valor incorrecto"
      this.style.borderColor = "red"
      this.borderColor = "2px solid"
   }
   else if (this.value){
      mensaje.textContent = "usuario correcto"
   }
   else{
      mensaje.textContent ="campo requerido"
       this.style.borderColor = "green"
       this.borderColor = "2px solid"
   }
   this.value = this.value.replace(/[^a-z]/g,"")

 })