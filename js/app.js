const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=> {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e){
   e.preventDefault();

   //Validar

   const ciudad = document.querySelector('#ciudad').value;
   const pais = document.querySelector('#pais').value;
     
     if(ciudad ==='' || pais === ''){
        mostrarError('Ambos campos son Obligatorios');

        return;
     }
   //Consultariamos la API
   conslutarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta =document.querySelector('.bg-red-100');
    if(!alerta){


       //Craer un alerta 
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');

    alerta.innerHTML = `
    <strong class="font-bold" >Error!</strong>
    <span class="block" >${mensaje}</span>
    `;

    container.appendChild(alerta); 
      
      //Se elimina la alerta despues de 5 segundos

      setTimeout(() => {
        alerta.remove();
      }, 3000);

    }

    
}

function conslutarAPI(ciudad,pais){
  const apiId = 'd5798cd45ea4912f26f33202193529c9';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

  Spinner(); //Muestra un spinner de carga

  fetch(url)
       .then(respuesta => respuesta.json())
       .then(datos => {
           limpiarHTML(); //Limpiar html previo
             if(datos.cod === "404"){
              mostrarError('Ciudad no Encontrada');
             }

             //Mostrar clima datos
             mostrarClima(datos);
       })

}

function mostrarClima(datos){
  const {name,main: {temp,temp_max,temp_min}}=datos;
  const centigrados = kelvinCentigrados(temp);
  const max = kelvinCentigrados(temp_max);
  const min = kelvinCentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl');

  const actual = document.createElement('p');
  actual.innerHTML = `${centigrados} &#8451`;
  actual.classList.add('font-bold', 'text-6xl');

  const tempMax= document.createElement('p');
  tempMax.innerHTML = ` Temperatura Maxima: ${max}&#8451`;
  tempMax.classList.add('text-xl');

  const tempMin= document.createElement('p');
  tempMin.innerHTML = ` Temperatura Minima: ${min}&#8451`;
  tempMin.classList.add('text-xl');

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);
  


  resultado.appendChild(resultadoDiv);

}

function kelvinCentigrados(grados){
  return parseInt(grados -273.15)
}

function limpiarHTML(){
  while (resultado.firstChild) {
     resultado.removeChild(resultado.firstChild);
    
  }
}

function Spinner(){
  limpiarHTML();
  const divSpiner = document.createElement('div');
  divSpiner.classList.add('sk-fading-circle');

  divSpiner.innerHTML= `
  
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>

  `;

  resultado.appendChild(divSpiner);
}