let Element = document.getElementById("totalPrecio");
    Element.innerHTML = "Total en precio";

let txtNombre = document.getElementById("Name");
    // txtNombre.value = "Leche Semidescremada";
    // let a = txtNombre.value;


let txtNumber = document.getElementById("Number");



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

// cuerpotabla[0].innerHTML= `<tr>
// <th scope="row">1</th>
// <td>Leche</td>
// <td>3</td>
// <td>$23.00</td>
// </tr>
// <tr>`


let agregar = document.getElementById("btnAgregar");
console.log(agregar);
// agregar.addEventListener("click",)

agregar.addEventListener("click", (event)=> {
    console.log("Click en el botón",event.target);
    // console.log(txtNombre.value, txtNumber.value);

    let precio = parseInt(Math.random()*100);
    
    let tmp = `<tr>
    <th scope="row">1</th>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>$ ${precio}</td>
    </tr>
    <tr>`

    cuerpotabla[0].innerHTML += tmp;

    txtNombre.value = "";
    txtNumber.value = "";
    txtNombre.focus();    // Manda el foco al espacio de nombre
}
);


