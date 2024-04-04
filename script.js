let divisa1Input = document.getElementById("divisa1Value");
let divisa2Input = document.getElementById("divisa2Value");  

let divisa1Select = document.getElementById("divisa1Select");
let divisa2Select = document.getElementById("divisa2Select");


let btnConvertir = document.getElementById("btnConvertir");
let btnInvertirDivisas = document.getElementById("btnInvertirDivisas");

let divisasNombres = [];


// Se llama a la api

// async function obtenerDatsoApi(){
//   fetch('https://api.frankfurter.app/currencies')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('La solicitud no pudo completarse correctamente');
//     }
//     return response.json();
//   })
//   .then(data => {
//     renderizarSelect(data);
    
//   })
//   .catch(error => {
//     console.error('Ocurrió un error al llamar a la API:', error);
//   });
// }

// obtenerDatsoApi();


// Llamar a la API Opción 2

const getDatosAPI = () =>{
   return new Promise ((resolve, reject) => {
    fetch('https://api.frankfurter.app/currencies')
     .then(response => {
       if(!response.ok){
         reject(new Error('Error fetching data'));
       }
       return response.json();
     })
     .then(data => {
       resolve(data);
     });
   })
}

async function obtenerDatosAPI(callback){
  try{
    const dataRecivida = await getDatosAPI();
    console.log(dataRecivida);
    renderizarSelect(dataRecivida);
    renderizarDivisasTabla();
  }catch(error){
    console.error('Ocurrió un error:', error);
  }
}

obtenerDatosAPI();

// Se agrega las divisas al select del HTML

function renderizarSelect(data){

  for (const key in data){
    let opcionElement = document.createElement('option');
    opcionElement.text = data[key];
    divisa1Select.add(opcionElement);
    let objetoC = new Object();
    objetoC.nombreA = key;
    objetoC.nombreC = data[key];
    divisasNombres.push(objetoC);
    
  }
  
  for (const key in data){
    let opcionElement = document.createElement('option');
    opcionElement.text = data[key];
    divisa2Select.add(opcionElement);
  }

  console.log( 'Array divisas nuevo',divisasNombres);

};


// Boton para llamar a la función a convertir divisas

btnConvertir.addEventListener('click', () => {

  let cantidadDivisa1 = divisa1Input.value;
  let cantidadDivisa2 = divisa2Input.value;
  let monedaDivisa1 = divisa1Select.value;
  let monedaDivisa2 = divisa2Select.value;
  
  console.log(monedaDivisa1);
  console.log(cantidadDivisa1);
  console.log(monedaDivisa2);

  let divisaEncontrada1 = divisasNombres.find(
    (divisa) => divisa.nombreC == monedaDivisa1
  )
  let divisaEncontrada2 = divisasNombres.find(
    (divisa) => divisa.nombreC == monedaDivisa2
  )

  console.log('Fuera del Async',divisaEncontrada1);

  let host = 'api.frankfurter.app';

  fetch(`https://${host}/latest?amount=${cantidadDivisa1}&from=${divisaEncontrada1.nombreA}&to=${divisaEncontrada2.nombreA}`)
    .then(resp => resp.json())
    .then((data) => {
      divisa2Input.value = data.rates[divisaEncontrada2.nombreA];
})

    });


// Función para invertir las divisas

btnInvertirDivisas.addEventListener('click', () => {
  let tempValue = divisa1Select.value;
  divisa1Select.value = divisa2Select.value;
  divisa2Select.value = tempValue;

 
  
})



// Función para convertir $100 pesos mexicanos en todas las divisas



function renderizarDivisasTabla(){

  let tbody = document.getElementById('container_tablaRender')
  let host = 'api.frankfurter.app';
  let divisa1Tabla = 'MXN';
  let cantidadDivisaTabla = 100;

  console.log('Prueba FRT',divisasNombres);
  let divisasNombres2 = divisasNombres.filter(objeto => objeto.nombreA !== 'MXN');

for (let i = 0; i < divisasNombres2.length; i += 3) {
        let fila = document.createElement('tr');
        
        for (let j = i; j < i + 3 && j < divisasNombres2.length;j++) {
        
            let celda = document.createElement('td');
            let divisa2Tabla = divisasNombres2[j].nombreA;
            let divisaC = divisasNombres2[j].nombreC;

            fetch(`https://${host}/latest?amount=${cantidadDivisaTabla}&from=${divisa1Tabla}&to=${divisa2Tabla}`)
            .then(resp => resp.json())
            .then((data) => {

            celda.textContent =`${data.rates[divisa2Tabla]} ${divisaC}`;
      
                })

            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
    }
}