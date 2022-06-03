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
let totalProd = 0;
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

let datos = [];

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




    totalProd += (cantidad<1)? Math.ceil(cantidad) : parseInt(cantidad);   // solo redondea cantidades 0.5 a 1 y las demas se queda con el entero
    // totalProd += Math.ceil(cantidad);        // Redondea al entero superior
    document.getElementById("totalProduct").innerHTML = totalProd;   // Muestra el total de productos en el span totalProd
   

    // Guardar en el local storage     setItem = guardar  ("Nombre de como se guarda", lo que se guarda)
    window.localStorage.setItem("totalProduct", totalProd)
    window.localStorage.setItem("total", totalPrec );
    window.localStorage.setItem("contadorProduct", contador);

   // Estructura de JSON {string:value,string:value}
    // {"id": contador, "nombre": txtNombre.value,"cantidad": txtNumber.value,"precio":precio}  

   let elemento = `{ "id": ${contador},
                    "nombre": "${txtNombre.value}",
                    "cantidad": ${txtNumber.value},
                    "precio" : ${precio}
                   }`;

    datos.push(JSON.parse(elemento));  //parse toma una cadena y la convierte a objeto
    localStorage.setItem("elementosTabla", JSON.stringify(datos) ); //stringify convierte a cadena
    console.log(datos);
    
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


window.addEventListener("load", function(){                             // Cuando la pagina termine de cargar

    if(localStorage.getItem("contadorProduct")!=null){                  // Verficia si tiene valor !=0 a contador de productos
        contador = parseInt(localStorage.getItem("contadorProduct"));
        document.getElementById("contadorProduct").innerHTML=contador;   
    }

    if(localStorage.getItem("totalProduct")!=null){                      // Verifica si hay cantidad de productos
        totalProd = parseInt(localStorage.getItem("totalProduct"));
        document.getElementById("totalProduct").innerHTML= totalProd;
    }

    if(localStorage.getItem("total")!=null){                             // Verifica si hay total
        totalPrec = parseFloat(localStorage.getItem("total"));         
        document.getElementById("costoTotal").innerHTML= `$ ${totalPrec}`;
    }

    // Verificar si la tabla de productos tiene datos y hacer todo lo de subir los productos a la tabla html
    if(localStorage.getItem("elementosTabla")!= null){
        datos = JSON.parse(localStorage.getItem("elementosTabla"));          //Convierte a objetos el arreglo
        datos.forEach(element => {                  // Para cada elemetno del arreglo en la posicion de la tabla 0 y se incrementa
            cuerpotabla[0].innerHTML +=   `<tr>     
            <th scope="row">${element.id}</th>
            <td> ${element.nombre}</td>
            <td> ${element.cantidad}</td>
            <td>$ ${element.precio}</td>
            </tr>
            <tr>`;
        });
       
     }
});