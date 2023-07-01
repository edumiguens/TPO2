const { createApp } = Vue
createApp({
    data() {
        return {
            cursos: [],
            url: 'http://edmiguens.pythonanywhere.com/cursos', 
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            resumen: "",
            capacidad: 0,
            precio: 0,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.cursos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(curso) {
            const url = this.url + '/' + curso;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let curso = {
                nombre: this.nombre,
                precio: this.precio,
                capacidad: this.capacidad,
                resumen: this.resumen
            }
            var options = {
                body: JSON.stringify(curso),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Curso grabado")
                    window.location.href = "./cursos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")

                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
