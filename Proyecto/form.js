//validacion del formulario
function validarFormulario() {
    let nombre = document.getElementById("nombre").value.trim()
    let mail = document.getElementById("mail").value.trim()
    let tel = document.getElementById("tel").value.trim()
    let consulta = document.getElementById("consulta").value.trim()
  
    if (nombre === "" || mail === "" || tel === "" || consulta === "") {
      alert("Por favor, complete todos los campos para enviar la consulta.")
      return false
    }
  
    for (var i = 0; i < nombre.length; i++) {
      let valorLetra = nombre.charCodeAt(i)
      if (
        !(valorLetra >= 65 && valorLetra <= 90) &&
        !(valorLetra >= 97 && valorLetra <= 122) &&
        !(valorLetra === 32)
      ) {
        alert("El nombre puede contener solamente caracteres alfabéticos.")
        return false
      }
    }
  
    if (!mail.includes("@")) {
      alert("Ingrese una dirección de correo electrónico válida.")
      return false
    }

    if(!(tel.length<=10)){
        alert("Recuerde que el número de teléfono no puede tener mas de 10 dígitos.")
        return false
    }

    for(var k=0;k < tel.length;k++){
        let numeroTel = tel.charAt(k)
        if(numeroTel<"0" || numeroTel>"9"){
            alert("El número de teléfono solo puede contener caracteres numericos.")
            return false
        }
    }

    if(consulta.length>700){
        alert("El campo de consulta tiene mas de los caracteres totales admitidos. Porfavor resuma su consulta.")
        return false
    }
  
    alert("Consulta enviada correctamente!")
    return true
  }

/*Funciones css para el formulario*/
const input = document.querySelectorAll(".input") /*Creo una arreglo que obtenga todo de la clase input*/

function focusFunc(){/*Creo la funcion focusFunc, cuando el input tiene el focus seleccionamos la clase input-container donde se encuentra el label*/
    let parent = this.parentNode
    parent.classList.add("focus")
}
function blurFocus(){/*Analogo al de focus solo que cada vez que deja de estar activado lo remueve. el if es para que si hay texto se quede activado*/
    let parent = this.parentNode
    if(this.value==""){
    parent.classList.remove("focus")
    }
}

input.forEach( input =>{/*Cada vez que se active focus, activa la funcion focusFunc*/
    input.addEventListener("focus", focusFunc)
    input.addEventListener("blur", blurFocus)
})