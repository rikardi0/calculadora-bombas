const negativo = -1;
const positivo = 1;

const calculo = document.querySelector('#heat');

let tempBoton = document.querySelector('#temperatura');
const tempUnidad = document.createElement('p');
tempUnidad.classList.add('texto');
tempUnidad.setAttribute('id','grados'); 
calculo.classList.add('unidad');
calculo.appendChild(tempUnidad);

const denVap = document.querySelector('#result');

let densidadValor = document.createElement('p');
densidadValor.textContent = `Densidad:`;
let presionValor = document.createElement('p');
presionValor.textContent = `Presion de Vapor: `;
denVap.appendChild(densidadValor);
denVap.appendChild(presionValor);

function densidad(uno, dos, tres, cuatro, text) {
    let den = (-0.0000001 * cuatro + 0.00004 * tres - 0.0077 * dos + 0.0575 * uno + 999.9).toFixed(4);

    if (text == true) {
        densidadValor.textContent = `Densidad: ${den} (kg/m³)`;

    }
    else {

    }
    return den;

};

function presionVapor(uno, dos, tres, cuatro, cinco, text) {
    let vap = (0.00000003 * cinco + 0.000003 * cuatro + 0.0002 * tres + 0.016 * dos + 0.4234 * uno + 6.1658).toFixed(4);

    if (text == true) {
        presionValor.textContent = `Presion de Vapor: ${vap} (hPa)`;
    }
    else {

    }

    return (vap);
}
//define la temperatura para densidad y tension
function temp() {
    let temp = document.querySelector('#temperatura').value;
    let tempQ = `${temp}` ** 5;
    let tempF = `${temp} ` ** 4;
    let tempT = `${temp} ` ** 3;
    let tempS = `${temp} ` ** 2;

    tempUnidad.textContent = "(C°)";
    if (temp < 101 && temp > -1) {
        densidad(temp, tempS, tempT, tempF, true);
        presionVapor(temp, tempS, tempT, tempF, tempQ, true)

    }
    else {
        alert('Temperatura entre 0 C° y 100 C°');
    }
}

tempBoton.addEventListener('change', () => temp())


const datos = document.querySelector('#datos')
datos.classList.add('unidad')

const altUnidad = document.createElement('p');
altUnidad.classList.add('texto');

const result = document.createElement('p');
result.textContent = `NPSH disp`; 
datos.appendChild(altUnidad);


//define ec para NPSH 
function calcNPSH(sentido) {
    const atm = 1.01325;
    const gravedad = 9.81;

    let perdida = document.querySelector('#perdida').value;
    let altura = document.querySelector('#altura').value;
    let temp = document.querySelector('#temperatura').value;
    let tempQ = `${temp}` ** 5;
    let tempF = `${temp} ` ** 4;
    let tempT = `${temp} ` ** 3;
    let tempS = `${temp} ` ** 2;

    let density = densidad(temp, tempS, tempT, tempF, false);
    let vaporTension = presionVapor(temp, tempS, tempT, tempF, tempQ, false);
    let vap = vaporTension * 0.001;

    let h = altura * sentido;

    let resultado = (100000 * (atm - vap) / (gravedad * density) + h - perdida).toFixed(5);

    result.textContent = `NPSH disp : ${resultado} (mts)`;
}

let perdida = document.querySelector('#perdida'); 
let altura = document.querySelector('#altura'); 

let unidadArr = [perdida, altura]; 

//incluye la unidad al modificar "datos"    
unidadArr.forEach(element => {
    addEventListener('change', () => altUnidad.textContent = '(mts)')
});

const final = document.querySelector('#npsh')

const abajo = document.createElement('button');
abajo.textContent = 'Fluido por encima de la bomba';

const arriba = document.createElement('button');
arriba.textContent = 'Fluido por abajo de la bomba';

abajo.classList.add('boton'); 
arriba.classList.add('boton'); 


final.appendChild(abajo);
final.appendChild(arriba);
final.appendChild(result);

//calculo final, con 'h' - ó +
abajo.addEventListener('click', () => calcNPSH(positivo));
arriba.addEventListener('click', () => calcNPSH(negativo));


//segunda parte de la pag 

const perdida = document.querySelector('#perdida')
