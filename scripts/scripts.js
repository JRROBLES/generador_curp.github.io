//Código escrito por Jesús Rodríguez para el CS T-III Portales
document.querySelector('#btn_calcular').addEventListener('click',calcularCurp);
// document.querySelector('#btn_copiar').addEventListener('click',copiarCurp);
document.querySelector('#btn_limpiar').addEventListener('click',limpiarPagina);

function calcularCurp(){
    // Recuerda que la ejecución de las funciones termina con el primer return que encuentre la función
    let nombre = document.querySelector("#Nombre").value.toUpperCase();
    if (comprobarCampoVacio(nombre, "Nombre") === 0){
        return;
    }
    //Recuerda que es importante primero ejecutar la función quitar nombres antes de quitar espacios
    nombre = quitarNombres(nombre);
    nombre = quitarEspacios(nombre);
    let apellidoP = document.querySelector("#Apellido_Paterno").value.toUpperCase();
    apellidoP = quitarEspacios(apellidoP);
    if (comprobarCampoVacio(apellidoP, "Apellido paterno") === 0){
        return;
    }
    let apellidoM = document.querySelector("#Apellido_Materno").value.toUpperCase();
    if(apellidoM.length === 0 || apellidoM === ''){
        document.querySelector("#Apellido_Materno").value="XXXX";
        apellidoM = "XXXX"
    }
    apellidoM = quitarEspacios(apellidoM);
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
}

function retornaVocal(texto){
    let vocales = ["A","E","I","O","U"]
    for(let i = 1; i<texto.length; i++){
        if(vocales.includes(texto[i])){
            return texto[i];
        }
    }
}

function retornaConsonante(texto){
    let consonantes = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    for(let i = 1; i<texto.length; i++){
        if(consonantes.includes(texto[i])){
            return texto[i];
        }
    }
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
    let nombresAQuitar = ["MARIA","JOSE","DEL"];
    for(let i = 0; i < nombresAQuitar.length; i ++){
        if(nombre.includes(nombresAQuitar[i])){
            nombre = nombre.replace(nombresAQuitar[i],'');
        }
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
        alert("El campo "+nombreCampo+" no puede estar vació");
        return 0;
    }
}

function convertirAX(arreglo){
    for(let i = 0; i < arreglo.length; i++){
        if(arreglo[i] === "Ñ"){
            arreglo[i] = "X"
        }
    }
}

async function copiarCurp(){
    if(navigator.clipboard){
        try {
            await navigator.clipboard.writeText(document.querySelector("#salida").value);
            alert("Texto copiado al portapapeles");
        } catch (err) {
            alert('Error al copiar al portapapeles error: ', err);
        }
    }else{
        alert("Tu navegador o version no admite esta función, copia el CURP de manera manual.");
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
}