document.querySelector('#btn_calcular').addEventListener('click',calcularCurp);
document.querySelector('#btn_copiar').addEventListener('click',copiarCurp);
document.querySelector('#btn_limpiar').addEventListener('click',limpiarPagina);
// document.querySelector('#dia_Nacimiento').addEventListener('keyup',);
// document.querySelector('#mes_Nacimiento').addEventListener('keyup',);
document.querySelector('#dia_Nacimiento').addEventListener('change',validarDiaNacimiento);
document.querySelector('#mes_Nacimiento').addEventListener('change',validarMesNacimiento);
document.querySelector('#Sexo').addEventListener('change',validarSexoNacimiento);
document.querySelector('#Entidad_Nacimiento').addEventListener('change',validarEntidadNacimiento);

function calcularCurp(){
    // Recuerda que la ejecución de las funciones termina con el primer return que encuentre la función
    let nombre = document.querySelector("#Nombre").value.toUpperCase();
    if (comprobarCampoVacio(nombre, "Nombre") === 0){
        return;
    }
    //Recuerda que es importante primero ejecutar la función quitar nombres antes de quitar espacios
    nombre = removerAcentos(nombre);
    nombre = quitarNombres(nombre);
    nombre = quitarEspacios(nombre);
    console.log(nombre);
    let apellidoP = document.querySelector("#Apellido_Paterno").value.toUpperCase();
    if (comprobarCampoVacio(apellidoP, "Apellido paterno") === 0){
        return;
    }
    apellidoP = removerAcentos(apellidoP);
    apellidoP = quitarNombres(apellidoP);
    apellidoP = quitarEspacios(apellidoP);
    console.log(apellidoP);
    let apellidoM = document.querySelector("#Apellido_Materno").value.toUpperCase();
    if(apellidoM.length === 0 || apellidoM === ''){
        document.querySelector("#Apellido_Materno").value="XXXX";
        apellidoM = "XXXX"
    }
    apellidoM = removerAcentos(apellidoM);
    apellidoM = quitarNombres(apellidoM);
    apellidoM = quitarEspacios(apellidoM);
    console.log(apellidoM);
    let diaNacimiento = document.querySelector("#dia_Nacimiento").value;
    if (comprobarCampoVacio(diaNacimiento, "Dia de nacimiento") === 0){
        return;
    }
    let mesNacimiento = document.querySelector("#mes_Nacimiento").value;
    if (comprobarCampoVacio(mesNacimiento, "Mes de nacimiento") === 0){
        return;
    }
    let anioNacimiento = document.querySelector("#anio_Nacimiento").value;
    if (comprobarCampoVacio(anioNacimiento, "Año de nacimiento") === 0){
        return;
    }
    let sexo = document.querySelector("#Sexo").value;
    if (comprobarCampoVacio(sexo, "Sexo") === 0){
        return;
    }
    let entidad = document.querySelector("#Entidad_Nacimiento").value;
    if (comprobarCampoVacio(entidad, "Entidad de nacimiento") === 0){
        return;
    }    
    let CURP = new Array(14);
    CURP[0] = apellidoP.charAt(0);
    CURP[1] = retornaVocal(apellidoP);
    CURP[2] = apellidoM.charAt(0);
    CURP[3] = nombre.charAt(0);
    CURP[1] = quitarAntiSonantes(CURP);
    CURP[4] = anioNacimiento.toString().slice(-2);
    CURP[5] = mesNacimiento;
    CURP[6] = diaNacimiento.toString().padStart(2,0);
    CURP[7] = sexo;
    CURP[8] = entidad;
    CURP[9] = retornaConsonante(apellidoP);
    CURP[10] = retornaConsonante(apellidoM);
    CURP[11] = retornaConsonante(nombre);
    CURP[12] = calculaHomoclave(anioNacimiento);
    let digitoVerificador = calcularDigitoVerificador(CURP.join(''));
    CURP[13] = digitoVerificador.toString();
    convertirAX(CURP);
    document.querySelector("#salida").value = CURP.join('');
    document.querySelector("#output").classList.add("validate");
}

function retornaVocal(texto){
    let vocales = ["A","E","I","O","U"];
    for(let i = 1; i<texto.length; i++){
        if(vocales.includes(texto[i])){
            return texto[i];
        }
    }
    return "X";
}

function retornaConsonante(texto){
    let consonantes = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    for(let i = 1; i<texto.length; i++){
        if(consonantes.includes(texto[i])){
            return texto[i];
        }
    }
    return "X";
}

function calculaHomoclave(anio) {
    anio = parseInt(anio);
    if(anio < 2000){
        return "0";
    }else{
        return "A";
    }
}

function quitarNombres(nombre){
    // Aquí es importante definir cada nombre 2 veces, uno con espacio antes y otro con espacio después.
    let nombresAQuitar = ["MARIA ", "JOSE ", "DEL ", "Y ", "DE ", "LA ", "LOS "," MARIA", " JOSE", " DEL", " Y", " DE", " LA", " LOS"];
    let ultimoNombreQuitado;
    for(let i = 0; i < nombresAQuitar.length; i ++){
        if(nombre.includes(nombresAQuitar[i])){
            ultimoNombreQuitado = nombre;
            nombre = nombre.replace(nombresAQuitar[i],'');
        }
    }
    nombre = quitarEspacios(nombre);
    if (nombre.length === 0){
        nombre = ultimoNombreQuitado;
    }
    return nombre;    
}

function quitarEspacios(txt){
    if(txt.includes(" ")){
        return txt.replace(/\s/g, '');
    }else{
        return txt;
    }
}

function removerAcentos(texto) {
    const acentos = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'};
    return texto.split('').map(letra => acentos[letra] || letra).join('');
}

// Esta función fua escrita por la IA de Bing
function calcularDigitoVerificador(curp) {
    const valores = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4,'5': 5, '6': 6, '7': 7, '8': 8, '9': 9,'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14,'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19,'K': 20, 'L': 21, 'M': 22, 'N': 23, 'Ñ': 24,'O': 25, 'P': 26, 'Q': 27, 'R': 28, 'S': 29,'T': 30, 'U': 31, 'V': 32, 'W':33 , 'X' :34,'Y' :35 , 'Z' :36};
    let suma = 0;
    for (let i = 0; i < curp.length; i++) {
        suma += (valores[curp[i]] * (18 - i));
    }
    let digitoVerificador = ((10 - (suma % 10)) %10);
    return digitoVerificador;
}

function quitarAntiSonantes(arreglo){
    let primerasCuatroLetras = arreglo.slice(0, 4);
    let texto = primerasCuatroLetras.join('');
    let combinacionesAQuitar = ["BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO", "COGE", "COJA", "COJE", "COJI", "COJO", "CULO", "FETO", "GUEY", "JOTO", "KACA", "KACO", "KAGA", "KAGO", "KOGE", "KOJO", "KAKA", "KULO", "LOCA", "LOCO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MION", "MOCO", "MULA", "PEDA", "PEDO", "PENE", "PUTA", "PUTO", "QULO", "RATA", "RUIN"];
    for(let i = 0; i < combinacionesAQuitar.length; i ++){
        if(texto.includes(combinacionesAQuitar[i])){
            return "X";
        }
    }
    return arreglo[1];
}

function comprobarCampoVacio(input, nombreCampo){
    if(input.length == 0 || input == ''){
        alert("El campo '"+nombreCampo+"' no puede estar vació");
        return 0;
    }
}

function convertirAX(arreglo){
    for(let i = 0; i < arreglo.length; i++){
        if(arreglo[i] === "Ñ" || arreglo[i] === ""){
            arreglo[i] = "X"
        }
    }
}

async function copiarCurp(){
    if(navigator.clipboard){
        try {
            await navigator.clipboard.writeText(document.querySelector("#salida").value);
        } catch (err) {
            alert('Error al copiar al portapapeles error: ', err);
        }
    }else{
        alert("Esta función solo está disponible en la versión web, copia el texto de manera manual");
    }
}

function limpiarPagina(){
    document.querySelector("#Nombre").value="";
    document.querySelector("#Apellido_Paterno").value = "";
    document.querySelector("#Apellido_Materno").value = "";
    document.querySelector("#dia_Nacimiento").value = "";
    document.querySelector("#mes_Nacimiento").value = "";
    document.querySelector("#anio_Nacimiento").value = "";
    document.querySelector("#Sexo").value = "";
    document.querySelector("#Entidad_Nacimiento").value = "";
    document.querySelector("#salida").value = "";
    document.querySelector("#special_1").classList.remove('validate');
    document.querySelector("#special_2").classList.remove('validate');
    document.querySelector("#special_3").classList.remove('validate');
    document.querySelector("#special_4").classList.remove('validate');
    document.querySelector("#output").classList.remove('validate');
}

function validarDiaNacimiento(){
    if (document.querySelector("#dia_Nacimiento").value != ""){
        document.querySelector("#special_1").classList.add('validate');
    }
}
function validarMesNacimiento(){
    if (document.querySelector("#mes_Nacimiento").value != ""){
        document.querySelector("#special_2").classList.add('validate');
    }
}
function validarSexoNacimiento(){
    if (document.querySelector("#Sexo").value != ""){
        document.querySelector("#special_3").classList.add('validate');
    }
}
function validarEntidadNacimiento(){
    if (document.querySelector("#Entidad_Nacimiento").value != ""){
        document.querySelector("#special_4").classList.add('validate');
    }
}

// ServiceWorker para la implementación de PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("../serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }