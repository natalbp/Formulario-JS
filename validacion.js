const usuario = document.getElementById('usuario')
const mensaje = document.getElementById('mensaje')
const password = document.getElementById('password')
const mensaje2 = document.getElementById('mensaje2')
const contador = document.getElementById('contador')
const form = document.querySelector('form')
const toggle = document.getElementById('togglePassword')
const submitBtn = document.getElementById('submitBtn')
const formMessage = document.getElementById('formMessage')

let failedAttempts = 0
let lockInterval = null

// Comprueba fortaleza de la contraseña
function checkPasswordStrength(pwd) {
   const requirements = {
      length: pwd.length >= 10,
      number: /\d/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
   }
   const missing = []
   if (!requirements.length) missing.push('mín. 10 caracteres')
   if (!requirements.number) missing.push('un número')
   if (!requirements.uppercase) missing.push('una mayúscula')
   if (!requirements.special) missing.push('un carácter especial')
   return { valid: missing.length === 0, missing, requirements }
}

if (usuario) {
   usuario.addEventListener('input', () => {
      // normalizar y quitar caracteres no permitidos
      usuario.value = usuario.value.toLowerCase().replace(/[^a-z0-9.-]/g, '')
      if (!usuario.value) {
         mensaje.textContent = 'Campo requerido'
         usuario.style.borderColor = ''
      } else if (usuario.value.length < 3) {
         mensaje.textContent = 'El nombre de usuario debe tener al menos 3 caracteres'
         usuario.style.borderColor = 'red'
      } else {
         mensaje.textContent = 'Usuario correcto'
         usuario.style.borderColor = 'green'
      }
   })
}

if (password) {
   password.addEventListener('input', () => {
      if (contador) contador.textContent = password.value.length
      const s = checkPasswordStrength(password.value)
      if (s.valid) {
         mensaje2.textContent = '✓ Contraseña fuerte'
         password.style.borderColor = 'green'
      } else {
         mensaje2.textContent = '✗ Requiere: ' + s.missing.join(', ')
         password.style.borderColor = 'red'
      }
   })
}

if (form) {
   form.addEventListener('submit', (e) => {
      e.preventDefault()
      const u = usuario ? usuario.value : ''
      const p = password ? password.value : ''
      const s = checkPasswordStrength(p)
      let valid = true

      // Validación adicional de usuario al enviar
      if (!u || u.length < 3 || !/^[a-z0-9.-]{3,}$/.test(u)) {
         mensaje.textContent = !u ? 'Usuario requerido' : 'Usuario inválido (mín. 3 caracteres)'
         if (usuario) usuario.style.borderColor = 'red'
         valid = false
      } else {
         mensaje.textContent = ''
         if (usuario) usuario.style.borderColor = ''
      }

      if (!s.valid) {
         mensaje2.textContent = 'Contraseña inválida: ' + s.missing.join(', ')
         if (password) password.style.borderColor = 'red'
         valid = false
      } else {
         mensaje2.textContent = ''
         if (password) password.style.borderColor = ''
      }

      if (valid) {
         // Éxito: mostrar mensaje en la vista y limpiar formulario
         if (formMessage) {
            formMessage.textContent = 'Formulario enviado correctamente'
            formMessage.style.color = 'green'
         }
         failedAttempts = 0
         if (usuario) usuario.value = ''
         if (password) password.value = ''
         if (contador) contador.textContent = '0'
         // limpiar mensajes
         if (mensaje) mensaje.textContent = ''
         if (mensaje2) mensaje2.textContent = ''
      } else {
         // intento fallido
         failedAttempts += 1
         if (formMessage) {
            formMessage.textContent = 'Intento fallido (' + failedAttempts + '/3)'
            formMessage.style.color = 'red'
         }
         if (failedAttempts >= 3) {
            lockForm(30)
         }
      }
   })
}

if (toggle && password) {
   toggle.addEventListener('click', () => {
      const showing = password.type === 'text'
      password.type = showing ? 'password' : 'text'
      toggle.textContent = showing ? 'Mostrar' : 'Ocultar'
   })
}

function lockForm(seconds) {
   if (!form) return
   // disable inputs and buttons inside the form
   const controls = form.querySelectorAll('input, button')
   controls.forEach(c => c.disabled = true)
   let remaining = seconds
   if (formMessage) {
      formMessage.textContent = 'Bloqueado por ' + remaining + ' segundos'
      formMessage.style.color = 'red'
   }
   lockInterval = setInterval(() => {
      remaining -= 1
      if (formMessage) formMessage.textContent = 'Bloqueado por ' + remaining + ' segundos'
      if (remaining <= 0) {
         clearInterval(lockInterval)
         controls.forEach(c => c.disabled = false)
         if (formMessage) formMessage.textContent = ''
         failedAttempts = 0
      }
   }, 1000)
}