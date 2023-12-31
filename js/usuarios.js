const { createApp } = Vue
createApp({
    data() {
        return {
            usuarios: [],
            url: 'http://edmiguens.pythonanywhere.com/usuarios', 
            error: false,
            cargando: true,
            id: 0,
            nombreyapellido: "",
            dni: 0,
            username: "",
            password: "",
            permiso: "",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(usuario) {
            const url = this.url + '/' + usuario;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let usuario = {
                nombreyapellido: this.nombreyapellido,
                dni: this.dni,
                username: this.username,
                password: this.password,
                permiso: this.permiso
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Usuario Registrado")
                    window.location.href = "./usuarios.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Registrar Usuario")

                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
