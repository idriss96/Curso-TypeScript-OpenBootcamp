// Funciones

/**
 * Función que muestra un saludo por consola
 */
function saludar(){
    let nombre = "Martín"
    console.log(`¡Hola, ${nombre}!`);
}

// Invocación de la función
saludar();

/**
 * Función que muestra un saludo por consola a una persona
 * @param nombre Nombre de la persona a saludar
 */
function saludarPersona(nombre: string){
    console.log(`¡Hola, ${nombre}!`);
}

saludarPersona("Martín");

/**
 * Función que muestra un adiós por consola a una persona
 * @param nombre Nombre de la persona a despedir, por defecto será "Pepe"
 */
function despedirPersona(nombre: string = "Pepe"){
    console.log(`¡Adiós, ${nombre}!`);
}

despedirPersona(); // Adiós, Pepe
despedirPersona("Alba"); // Adiós, Alba

/**
 * Función que muestra un adiós por consola a una persona
 * @param nombre (Opcional) Nombre de la persona a despedir
 */
function despedidaOpcional(nombre?: string){
    if(nombre){
        console.log(`¡Adiós, ${nombre}!`);
    }else{
        console.log(`¡Adiós!`);
    }
}

despedidaOpcional(); // ¡Adiós!
despedidaOpcional("Juanjo"); // ¡Adiós Juanjo!


function variosParams(nombre: string, apellidos?:string, edad: number = 18){
    if(apellidos){
        console.log(`${nombre} ${apellidos} tiene ${edad} años`);
    }else{
        console.log(`${nombre} tiene ${edad} años`)
    } 
}

variosParams("Martín") // Martín tiene 18 años
variosParams("Martín", "San José") // Martín San José tiene 18 años
variosParams("Martín", undefined, 30) // Martín tiene 30 años
variosParams("Martín", "San José", 30) // Martín San José tiene 30 años
variosParams("Martín", "San José", 30); // Martín San José tiene 30 años

function ejemploVariosTipos(a: string | number ){
    if(typeof(a) === 'string'){
        console.log("A es un string")
    }else if(typeof(a) === 'number'){
        console.log("A es un number")
    }else{
        console.log("A no es un string ni tampoco un number");
        throw Error("A no es un string ni un number")
    }
}

ejemploVariosTipos("Hola");
ejemploVariosTipos(3);


/**
 * 
 * @param nombre Nombre de la persona
 * @param apellidos Apellidos de la persona
 * @returns Nombre completo de la persona
 */
function ejemploReturn(nombre: string, apellidos: string): string{
    return `${nombre} ${apellidos}`;
}

const nombreCompleto = ejemploReturn("Martín", "San José");

console.log(nombreCompleto); // Martín San José
console.log(ejemploReturn("Martín", "San José")) // Martín San José


/**
 * 
 * @param nombres es una lista de nombres de string
 */
function ejemploMultipleParams(...nombres: string[]): void{
    nombres.forEach((nombre) => {
        console.log(nombre)
    });
}

ejemploMultipleParams("Martín");
ejemploMultipleParams("Martín", "Pepe", "Juan", "Alba");

const lista = ["Alberto", "Sandra"]
ejemploMultipleParams(...lista);

function ejemploParamLista(nombres: string[]){
    nombres.forEach((nombre) => {
        console.log(nombre)
    });
}

ejemploParamLista(lista);



// ARROW Functions

type Empleado = {
    nombre: string
    apellidos: string
    edad: number
}

let empleadoMartín: Empleado = {
    nombre: "Martín",
    apellidos: "San José",
    edad: 30
}


const mostrarEmpleado = (empleado: Empleado):string => `${empleado.nombre} tiene ${empleado.edad} años` 

// Llamamos a la función
mostrarEmpleado(empleadoMartín);

const datosEmpleado = (empleado: Empleado): string => {
    if(empleado.edad > 70){
        return `Empleado ${empleado.nombre} está en edad de jubilación`
    }else {
        return `Empleado ${empleado.nombre} está en edad laboral`
    }
}

datosEmpleado(empleadoMartín) // Empleado Martín está en edad laboral

const obtenerSalario = (empleado: Empleado, cobrar: () => string) => {
    if(empleado.edad > 70){
        return
    }else {
        cobrar() // callback a ejecutar
    }
}


const cobrarEmpleado = (empleado: Empleado) => {
    console.log(`${empleado.nombre} cobra su salario`);
}


obtenerSalario(empleadoMartín, () => 'Cobrar Martín');



// Async Functions

async function ejemploAsync(): Promise<string>{

    await console.log("Tarea a completar antes de seguir con la secuencia de instrucciones")
    console.log("Tarea completada")
    return "Completado"

}


ejemploAsync()
.then((respuesta) => {
    console.log("Respuesta", respuesta);
}).catch((error) => {
    console.log("Ha habido un error", error)
}).finally(() => "Todo ha terminado");


// Generators

function* ejemploGenerator() {

    // yield --> para emitir valores

    let index = 0;

    while(index < 5){
        // Emitimos un valor incrementado
        yield index++;
    }
    
}


// Guardamos la función generadora en una variable

let generadora = ejemploGenerator();

// Accedemos a los valores emitidos

console.log(generadora.next().value) // 0
console.log(generadora.next().value) // 1
console.log(generadora.next().value) // 2
console.log(generadora.next().value) // 3


// Worker

function* watcher(valor: number){

    yield valor; // emitimos el valor inicial
    yield* worker(valor); // Llamamos a las emisiones del woker para que emita otros valores
    yield valor + 4; // emitimos el valor final + 4

}


function* worker(valor: number){
    yield valor + 1;
    yield valor + 2;
    yield valor + 3;
}

let generatorSaga = watcher(0);

console.log(generatorSaga.next().value); // 0 (lo ha hecho el watcher)
console.log(generatorSaga.next().value); // 1 (lo ha hecho el worker)
console.log(generatorSaga.next().value); // 2 (lo ha hecho el worker)
console.log(generatorSaga.next().value); // 3 (lo ha hecho el worker)
console.log(generatorSaga.next().value); // 4 (lo ha hecho el watcher)

// Sobrecarga de funciones

function mostrarError(error: string | number): void{
    console.log("Ha habido un error:", error);
}




// Persistencia de datos
// 1. LocalStorage --> Almacena los datos en el navegador (no se eliminan automáticamente)
// 2. SessionStorage --> La diferencia radica en la sesión de navegador. Es decir, los datos se persisten en la sesión de navegador
// 3. Cookies --> Tienen una fecha de caducidad y también tienen un ámbito de URL


// LocalStorage y SessionStorage
function guardar(): void{
    localStorage.set("nombre", "Martín");
    sessionStorage.set("nombre", "Martín");
}

function leer(): void{
    let nombre = localStorage.get("nombre");
    let nombreSession = sessionStorage.get("nombre");
}

function borrarItem(item:string){
    localStorage.removeItem(item);
    sessionStorage.removeItem(item);
}

function borrarTodas(): void {
    localStorage.clear();
    sessionStorage.clear();
}

// Cookies

// const cookieOptions = {
//     name: "usuario", // string,
//     value: "Martín", // string,
//     maxAge: 10 * 60, // optional number (value in seconds),
//     expires: new Date(2099, 10, 1), // optional Date,
//     path: "/", // optional string,
//   };

// Seteamos la Cookie
// setCookie(cookieOptions);

// Leer una Cookie
// let cookieLeida = getCookieValue("usuario");

// Eliminar
// deleteCookie("usuario");

// Eliminar todas las Cookies
// deleteAllCookies();


// Clase Temporizador

class Temporizador {

    public terminar?: (tiempo:number) => void;

    public empezar(): void {
        setTimeout(() => {
            // Comprobamos que exista la función terminar como callback
            if(!this.terminar) return;

            // Cuando haya pasado el tiempo, se ejecutará la función terminar
            this.terminar(Date.now());
        }, 10000)
    }
}


const miTemporizador: Temporizador = new Temporizador();

// Definimos la función del callback a ejecutar cuando termine el tiempo
miTemporizador.terminar = (tiempo: number) => {
    console.log("Evento terminado en:", tiempo)
}

// Lanzamos el temporizador
miTemporizador.empezar(); // Se inicia el timeout y cuando termine, se ejecuta la función terminar()


// setInterval(() => console.log("Tic"), 1000) // Imprimir "tic" cada segundo por consola

// Eliminar la ejecución de la función
delete miTemporizador.terminar;
