console.log(location.search)
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            apellido: "",
            dni: 0,
            permiso: "",
            url: 'http://edmiguens.pythonanywhere.com/usuarios/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.apellido = data.apellido
                    this.dni = data.dni
                    this.permiso = data.permiso
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let usuario = {
                nombre: this.nombre,
                apellido: this.apellido,
                dni: this.dni,
                permiso: this.permiso
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Usuario modificado")
                    window.location.href = "./usuarios.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar el usuario")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')