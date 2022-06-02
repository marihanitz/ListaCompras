let Element = document.getElementById("totalPrecio");
    Element.innerHTML = "Total en precio";

let txtNombre = document.getElementById("Name");
    // txtNombre.value = "Leche Semidescremada";
    // let a = txtNombre.value;


let txtNumber = document.getElementById("Number");   

let total = document.getElementById("costoTotal");   // span donde se muestra el costo total

// let campos = document.getElementsByClassName("campo");
// campos[0].value = "Leche descremada descaltosada light = agua";
// console.log(campos[0].value);

// for (let i=0; i<campos.length;i++){
//     campos[i].style.border="red thin solid";
// }


// let spans = document.getElementsByTagName("span");
// for (let i =0 ; i<spans.length;i++){
//     console.log(spans[i].textContent);
// }


let tabla = document.getElementById("tablaCompras");       // Se refiere a la tabla  de compras 
let cuerpotabla = tabla.getElementsByTagName("tbody");     //Se refiere al cuerpo de la tabla


let contador = 0;
let totalPrec = 0;
let agregar = document.getElementById("btnAgregar");
console.log(agregar);
// agregar.addEventListener("click",)


function validarnombre () {
    if(txtNombre.value.length==0) {
        return false;
    }
    if(txtNombre.value.lenght<3){
        return false;
    }
    return true;
}

function validarCantidad () {
    if(txtNumber.value.length==0) {
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false;
    }
    if (parseFloat(txtNumber.value)<=0){
        return false;
    }
    return true;
}

agregar.addEventListener("click", (event)=> {
    event.preventDefault();
    if ( (!validarnombre()) || (!validarCantidad ()) ){
        let lista = "";


        if(!validarCantidad ()){
            txtNumber.style.border = "red thin solid";
            lista+= "<li> Se debe escribir una cantidad válida </li>"

        }

        if(!validarnombre () ){
            txtNombre.style.border = "red thin solid";
            lista+= "<li> Se debe escribir un nombre válido </li>"
        }


        document.getElementById("alerttexto").innerHTML= `Los campos deben ser llenados correctamente. 
        <ul>${lista} </ul>`;


        document.getElementById("alertvalidaciones").style.display="block";
        
        setTimeout(function(){
        document.getElementById("alertvalidaciones").style.display = "none";
        }, 5000);
        return false;
    }

    txtNombre.style.border = "";
    txtNumber.style.border = "";

    document.getElementById("alertvalidaciones").style.display="none";

    // console.log("Click en el botón",event.target);
    contador++;
    document.getElementById("contadorProduct").innerHTML= contador;
    let precio = (Math.floor( (Math.random()*50) *100) )/100;
    let cantidad = parseFloat(txtNumber.value);   //para obtener la cantidad convierte el input de cantidad a numero
    totalPrec += precio * cantidad;  // obtiene el precio total precio unitario*cantidad
    total.innerHTML = `$ ${totalPrec.toFixed(2)}`; // muestra en el html el precio total

    
    let tmp = `<tr>
    <th scope="row">${contador}</th>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>$ ${precio.toFixed(2)}</td>
    </tr>
    <tr>`

    cuerpotabla[0].innerHTML += tmp;   // sube el nombre cantidad y precio al html +=para que se vaya acumulando

    txtNombre.value = "";  // Vacia el espacio de nombre y cantidad
    txtNumber.value = "";
    txtNombre.focus();    // Manda el foco al espacio de nombre
}
);


txtNombre.addEventListener("blur",(event)=>{
    event.target.value = event.target.value.trim();  //quita los espacios en blanco
   
   
}) //reacciona a evento  cuando se pierde el foco

txtNumber.addEventListener("blur",(event)=>{
    event.target.value = event.target.value.trim();
   
}) //reacciona a evento  cuando se pierde el foco