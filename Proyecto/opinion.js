const { createApp } = Vue
const miApp = createApp({
    data() {
        return {
            opinionActuales: "",
            opinionesHechas: 0,
            opinionUsuario: "",
            op1: "Me encantaron los cursos!!"
        }
    },

    methods: {
        mostrarDatosdeAPI() {
            fetch('https://randomuser.me/api')
                .then(datos => datos.json())
                .then(datos => {
                    this.opinionActuales +=
                        `<div class="seccionOp">
                        <h4>usuario:</h4>
                        <h3>${datos.results[0].login.username}</h3><br>
                    <img src="${datos.results[0].picture.large}">
                    <p class="titulocent">${this.op1}</p>
                    <h1>${datos.results[0].name.first}</h1><br>
                    </div>`
                    this.opinionesHechas++
                })
        },
        colgarOpinion() {
            let opinion = document.getElementById("input").value
            let nombre = document.getElementById("nombre").value
            let usuario = document.getElementById("usuario").value
            if (opinion.length > 150) {
                alert("Superaste el limite de caracteres permitidos. Haz una opinion mas corta.")
                return false
            } else {
                this.opinionUsuario +=
                    `<div class="seccionOp secus">
                <h4>usuario:</h4>
                <h3>${usuario}</h3>
                <img class="imgusuario" src="imagenes/usuario.png">
                <div class="textoOp">
                <p class="titulocent">${opinion}</p>
                </div>
                <div>
                <h1>${nombre}</h1><br>
                </div>
                </div>`
                this.opinionesHechas++
            }
        },
    }

})
miApp.mount('#opinion-app')




