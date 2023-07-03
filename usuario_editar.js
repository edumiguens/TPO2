console.log(location.search)
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            nombreyapellido: "",
            dni: 0,
            username: "",
            password: "",
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
                    this.nombreyapellido = data.nombreyapellido;
                    this.dni = data.dni
                    this.username = data.username
                    this.password = data.password
                    this.permiso = data.permiso
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let usuario = {
                nombreyapellido: this.nombreyapellido,
                dni: this.dni,
                username: this.username,
                password: this.password,
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