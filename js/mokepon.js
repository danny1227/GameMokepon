const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionBotonReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionBotonReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjeta = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let botonFuego
let botonAgua
let botonTierra

let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionMokepones
let ataquesMokepon
let ataquesMokeponEnemigo
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let indexAtaqueJugador
let indexAtaqueEnemigo
let mascotaJugadorObjeto
let victoriasJugador = 0
let victoriasEnemigo = 0
let botones = []
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext( '2d' )
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 25
const anchoMaxMapa = 350

if(anchoDelMapa > anchoMaxMapa){
    anchoDelMapa = anchoMaxMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 270/350
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida,fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
           )
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5, './assets/ratigueya.png')

const HIPODOGE_ATAQUES =[
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}   
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUE = [
    {nombre: '🌱', id: 'boton-tierra'},   
    {nombre: '🌱', id: 'boton-tierra'},  
    {nombre: '🌱', id: 'boton-tierra'},  
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUE)


const RATIGUEYA_ATAQUE = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},   
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUE)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre} />
            </label>
            `
            contenedorTarjeta.innerHTML += opcionMokepones

            inputHipodoge = document.getElementById('Hipodoge')
            inputCapipepo = document.getElementById('Capipepo')
            inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8880/unirse")
    .then(function (res){
        if (res.ok) {
            res.text()
            .then(function (respuesta){
                jugadorId = respuesta
            })
        }
    })
    

}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'
    //sectionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert('Selecciona una mascota 😊')
    }
    sectionVerMapa.style.display = 'flex'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)

    iniciarMapa()
}


function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8880/mokepon/${jugadorId}`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques 

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
            ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
            `
            contenedorAtaques.innerHTML += ataquesMokepon
        });

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e)=> {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '🌱'){
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo() 
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
        for (let i = 0; i < ataqueJugador.length; i++) {
            if (ataqueJugador[i] === ataqueEnemigo[i]) {
                indexAmbosOponentes(i, i)
                crearMensaje('EMPATE')    
            }else if (ataqueJugador[i] === 'FUEGO' &&
                      ataqueEnemigo[i] === 'TIERRA') {
                indexAmbosOponentes(i, i)
                crearMensaje('GANASTE')    
                victoriasJugador ++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if (ataqueJugador[i] === 'AGUA' &&
                      ataqueEnemigo[i] === 'FUEGO') {
                indexAmbosOponentes(i, i)
                crearMensaje('GANASTE')    
                victoriasJugador ++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if (ataqueJugador[i] === 'TIERRA' &&
                      ataqueEnemigo[i] === 'AGUA') {
                indexAmbosOponentes(i, i)
                crearMensaje('GANASTE')    
                victoriasJugador ++
                spanVidasJugador.innerHTML = victoriasJugador
            }else{
                indexAmbosOponentes(i, i)
                crearMensaje('PERDISTE')    
                victoriasEnemigo ++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
        }

        revisarvidas()
}

function revisarvidas(){
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Esto fue un empate!!')
    }else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Felicitaciones! Ganaste!')
    }else{
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado){
        let nuevoAtaqDelJugador = document.createElement('p')
        let nuevoAtaqDelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML = resultado
        nuevoAtaqDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqDelEnemigo.innerHTML = indexAtaqueEnemigo
        
        ataquesDelJugador.appendChild(nuevoAtaqDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
        sectionMensajes.innerHTML = resultadoFinal;
        sectionBotonReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y - mascotaJugadorObjeto.velocidadY   
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0, 
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })    
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8880/mokepon/${jugadorId}/posicion`,{   
          method: "post",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
              x,
              y
          })
    })
    .then(function (res) {

            res.json()
            .then(function({enemigos}){
                
                 enemigos.forEach(function(enemigo){
                    let mokeponEnemigo = null   
                    if (enemigo.mokepon != undefined) {
                             
                        //     console.log(enemigo)
                            const mokeponNombre = enemigo.mokepon.nombre || ""

                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5, './assets/hipodoge.png')
                            }else if(mokeponNombre === "Capipepo"){
                                mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5, './assets/capipepo.png')
                            }else if(mokeponNombre === "Ratigueya"){
                                mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5, './assets/ratigueya.png')
                            }
                        
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y 

                            return mokeponEnemigo
                            
                    }  
                 })

            })

        }
        )
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return  mokepones[i]
        }
    }
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
    
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = 5
}

 function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = -5
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown',sePrecionoTecla)
    window.addEventListener('keyup',detenermovimiento)
}

function detenermovimiento(){
    const mimokepon = obtenerObjetoMascota()
    mimokepon.velocidadX = 0
    mimokepon.velocidadY = 0
}

function sePrecionoTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;      
        case 'ArrowLeft':
            moverIzquierda()
            break;            
        default:
            break;
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaenemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaenemigo
    ){
        return
    }

    detenermovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)