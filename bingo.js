var contadorTableros = 0;
var todosTableros = [];
let arrayBola = [];
let checker = (arr, target) => target.every(v => arr.includes(v));
var arrayCeldas = [];
const MAX = 90;
const MIN = 1;
var haGanado = false;


/**
 * funcion que genera el carton del bingo
 */
function generaTabla() {

    var cartonesDiv = document.getElementById("tableros");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    let contArray = 0;
    let array = numerosCarton();
    todosTableros.push(array);
    let aux = 0;

    
    for (var i = 0; i < 4; i++) {
        var hilera = document.createElement("tr");
        let auxBingo = 0;
        for (var j = 0; j < 5; j++) {
            var celda;
            /**comprobamos si estamos en la primera fila, si es asi generamos la palabra bingo si no introducimos los numeros del carton */
            if(aux == 0){
               celda = document.createElement("th");
               celda.setAttribute("colspan","5");
            }else{
                celda = document.createElement("td");
            }
            console.log()
            
            let div = document.createElement("div");
            celda.appendChild(div);
            div.className = "celda";
            var textoCelda;
            if (aux === 0) {
                auxBingo === 0 ? textoCelda = document.createTextNode("BINGO") : '';
            } else {
                textoCelda = document.createTextNode(array[contArray]);
                contArray++;
            }
            auxBingo++;
            div.appendChild(textoCelda);
            hilera.appendChild(celda);
            if(aux == 0){
                break;
            }
            

        }
        aux++;

        tblBody.appendChild(hilera);
    }


    tabla.appendChild(tblBody);

    cartonesDiv.appendChild(tabla);

    tabla.setAttribute("border", "2");

    
    contadorTableros++;


}






/* Funion que devuelve un array de 15 numeros aleatorios */

function numerosCarton() {
    let array = [];
    for (let i = 0; i < 15; i++) {
        let n = Math.floor(Math.random() * MAX) + MIN;
        if (array.includes(n)) {
            i--;
        } else {
            array.push(n);
        }
    }
    return array;
}

/** Funcion que comprueba si se pueden mostrar o no los numeros del bingo, en caso afirmativo llamamos a la funcion que los muestra */
function mostrarNumerosBingo() {
    
    if(contadorTableros === 0){
        alert("saque un carton");
    }else if(haGanado == true){
        alert("PARTIDA YA FINALIZADA")
    }else{
        funcionMostrarNumeros()
    }
}

/** Funcion que muestra los numeros de la bola del bingo */
function funcionMostrarNumeros(){
    var bolaBingo = document.getElementById("bolaBingoTexto");
    let nActual = sacarNumeros(arrayBola);
    arrayBola.push(nActual);
    bolaBingo.innerHTML = arrayBola[(arrayBola.length - 1)];

    arrayCeldas = document.querySelectorAll(".celda");


    /** Llamar a la funcion que colorea las celdas */
    colorearCeldas(arrayCeldas,nActual);

    /** Llamar a la funcion de ganar */
    ganar(arrayBola);
    
    
    
}

/** Funcion que colorea las celdas si el numero coincide */
function colorearCeldas(arrayCeldas,nActual){
    arrayCeldas.forEach(e => {
        if(e.innerHTML == nActual){
            e.style.backgroundColor = "green";
            e.style.borderRadius = "100%";
        }
    });
}

/** Comrpueba si has ganado o no*/
function ganar(arrayBola){
    for(let i = 0; i<todosTableros.length;i++){
        
        if(checker(arrayBola,todosTableros[i])){
            alert("Carton "+(i+1) +" ha ganado");
            haGanado = true;
        }

    }
}


/* Funcion que comprueba si generar o no un carton*/
function generarONO() {
    
    
/** comprueba que no haya mas de tres tableros creados y que no se haya sacado ninguna bola, si es asi
 *  llama a la funcion que genera el carton
 */
    if(contadorTableros<3){
        if(arrayBola.length===0){
            generaTabla()
        }else{
            document.getElementById("crearTablerosBoton").disabled = true;
            alert("la partida ya ha empezado")
        }
    }else{
        document.getElementById("crearTablerosBoton").disabled = true
        alert("No puedes tener mas de tres cartones")
    }
}




/* Funcion que devuelve un numero aleatorio que no haya salido aun en el bingo */

function sacarNumeros(array) {

    for (let i = 0; i < 1; i++) {
        let n = Math.floor(Math.random() * MAX) + MIN;
        if (array.includes(n)) {
            i--;
        } else {
            return n;
        }
    }

}
      
