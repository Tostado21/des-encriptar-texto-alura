// obtenemos valores de los campos
var btn_encriptar = document.querySelector(".btn-encri");
var btn_desencriptar = document.querySelector(".btn-desen")
var btn_copy = document.querySelector(".btn-copy") ;
var textarea_input = document.querySelector("#textarea_form");
var textarea_result = document.querySelector("#textarea_result");
var content_result = document.querySelector(".content-inputs");
var content_info = document.querySelector(".content-info");

btn_encriptar.onclick = function () {
    //verificamos si el campo no se encuentra vacio y que ejecute la siguiente instrucción
    console.log(textarea_input.value);
    if (!isEmpty_verificarTextarea(textarea_input.value)) {
        //ejecutamos las intrucciones correspondientes
        preparandoCampos();
        //metodo encriptar texto
        textarea_result.value = encriptarTexto(textarea_input.value);
        console.log(encriptarTexto(textarea_input.value));
    }else{
        //mensaje de alerta dentro del campo textarea
        textarea_input.focus();
        textarea_input.style.borderColor = "red";
        console.log("texto vacio");
    }
};
btn_desencriptar.onclick = function () {
    //verificamos si el campo no se encuentra vacio y que ejecute la siguiente instrucción
    console.log(textarea_input.value);
    if (!isEmpty_verificarTextarea(textarea_input.value)) {
        //ejecutamos las intrucciones correspondientes
        preparandoCampos();
        //metodo encriptar texto
        textarea_result.value = desencriptarTexto(textarea_input.value);
        console.log(desencriptarTexto(textarea_input.value));
    }else{
        //mensaje de alerta dentro del campo textarea
        textarea_input.focus();
        textarea_input.style.borderColor = "red";
        console.log("texto vacio");
    }
};

btn_copy.onclick = function() {
    var text = textarea_result.value;
    copyTextToClipboard(text);
}

//******************************************************************************************************* */
async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
    }
}
//metodo para verificar si no esta vacio el textarea
function isEmpty_verificarTextarea(param){
    if (param.trim().length === 0) {
        return true;
    }
    return false;
}
//metodo para dar visibilidad al contenido derecho; textarea y boton, y ocultar el contenido informativo
function preparandoCampos(){
    content_result.style.display="block";
    content_info.style.display="none";
}

//metodo para encriptar el texto
/* 
Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"

Requisitos:
- Debe funcionar solo con letras minúsculas
- No deben ser utilizados letras con acentos ni caracteres especiales
- Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.

Por ejemplo:
"gato" => "gaitober"
gaitober" => "gato"
*/
function encriptarTexto(params) {
    /* como existen 5 letras que hay que reemplazar, eso lo podriamos interpretar como el margen (length)
    por lo tanto, podemos implementar un ciclo donde por cada letra se va remplazando el texto */
    var letras = ['e','i','a','o','u'];
    var palabra = ['enter','imes','ai','ober','ufat']
    var expr;
    var aux = "";
    for (let i = 0; i < 5; i++) {
        expr = new RegExp(letras[i],'g');
        aux = params.replace(expr, palabra[i]);
        params = aux;
        aux ="";
    }
    return params;
}
//metodo para desencriptar el texto
function desencriptarTexto(params) {
    /* como existen 5 letras que hay que reemplazar, eso lo podriamos interpretar como el margen (length)
    por lo tanto, podemos implementar la recursividad */
    var letras = ['e','i','a','o','u'];
    var palabra = ['enter','imes','ai','ober','ufat']
    var expr;
    var aux = "";
    for (let i = 0; i < 5; i++) {
        expr = new RegExp(palabra[i],'g');
        aux = params.replace(expr, letras[i]);
        params = aux;
        aux ="";
    }
    return params;
}