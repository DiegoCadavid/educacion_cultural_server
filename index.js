// const config = require('./models');
// import Person from './models/Person.js';

import Model from "./database/Model.js";

// import { generateFile, generateRegisters } from './app.js';
//
// generateRegisters(10, Person);

const Localidad = new Model("localidad");
const Colegio = new Model("colegio");

Localidad.create({
  cantidad_de_colegios: 0,
});
Localidad.create({
  cantidad_de_colegios: 0,
});
Localidad.create({
  cantidad_de_colegios: 0,
});

const createColegio = (data) => {
  if (!Localidad.find(data.localidad_id)) {
    return false;
  }

  Colegio.create(data);
  Localidad.update(data.localidad_id, {
    cantidad_de_colegios:
      Localidad.find(data.localidad_id)?.cantidad_de_colegios + 1,
  });
  return true;
};

createColegio({
  tipo: "PUBLICO",
  cantidad_alumnos: 100,
  localidad_id: 1,
});
createColegio({
  tipo: "PUBLICO",
  cantidad_alumnos: 100,
  localidad_id: 1,
});
createColegio({
  tipo: "PUBLICO",
  cantidad_alumnos: 100,
  localidad_id: 2,
});


const Beneficio = new Model("beneficio");

Beneficio.create({
  nombre: "bppi",
  disponible: 100,
  asignados: 0
})

Beneficio.create({
  nombre: "bpps",
  disponible: 100,
  asignados: 0
})

const Persona = new Model("person");

Persona.create({
  di: 1000000000,
  fecha_nacimiento: "10-12-2003",
  localidad: 1,
  genero: "M",
  bppi: false,
  bpps: false,
  pe: true,
  localidad_id: 1,
  colegio_id: 1,
  indicador_socio_economico: 2,
});
Persona.create({
  di: 1000000000,
  fecha_nacimiento: "10-12-2003",
  localidad: 1,
  genero: "M",
  bppi: false,
  bpps: false,
  pe: true,
  localidad_id: 1,
  colegio_id: 1,
  indicador_socio_economico: 2,
});
Persona.create({
  di: 1000000000,
  fecha_nacimiento: "10-12-2003",
  localidad: 1,
  genero: "M",
  bppi: false,
  bpps: false,
  pe: true,
  localidad_id: 1,
  colegio_id: 1,
  indicador_socio_economico: 2,
});


const alternarBeneficio = (persona_id, beneficio ) => {
  Persona.update(persona_id,{
    [beneficio]: !Persona.find(persona_id)[beneficio] 
  });
      // Hacer que se quiten o agreguen de forma condicional segun el valor inicial
   Beneficio.update(Beneficio.findByKey("nombre", beneficio)[0].id, {
    disponible: Beneficio.findByKey("nombre", beneficio)[0].disponible - 1,
    asignados: Beneficio.findByKey("nombre", beneficio)[0].asignados + 1
   });
}

alternarBeneficio(3,"bppi");
alternarBeneficio(2,"bppi");
alternarBeneficio(1,"bpps");


console.log(Beneficio.findAll());

/**
 * Recibe una key y se sacan los beneficios 
 * @param {string} key 
 */
const analisisBeneficios = (key) => {
  const allBeneficios = Beneficio.findAll();
  const personas = Persona.findAll();

  const beneficiosAsignados = {}
  allBeneficios.forEach( beneficio => {
    beneficiosAsignados[beneficio.nombre] = ( personas.filter( persona => persona[beneficio.nombre])) 
  })
  
  let totalBeneficios = {} 
  Object.keys(beneficiosAsignados).forEach(tipo => {
    totalBeneficios[tipo] = beneficiosAsignados[tipo].filter(item =>  item[Object.keys(key)[0]] === key[Object.keys(key)[0]]).length / Beneficio.findAll().length * 100
  })

  // console.log('totales')
  // console.log(totalBeneficios)
  return totalBeneficios
}


console.log('total localidad 1',analisisBeneficios({localidad: 1}));
console.log('total localidad 2',analisisBeneficios({localidad: 2}));
console.log('total localidad 3',analisisBeneficios({localidad: 3}));
console.log('total colegio 1',analisisBeneficios({colegio_id: 1}));
console.log('total colegio 2',analisisBeneficios({colegio_id: 2}));
console.log('total colegio 3',analisisBeneficios({colegio_id: 3}));
console.log('total indicador socioeconomico 1',analisisBeneficios({indicador_socio_economico: 1}));
console.log('total indicador socioeconomico 2',analisisBeneficios({indicador_socio_economico: 2}));
console.log('total indicador socioeconomico 3',analisisBeneficios({indicador_socio_economico: 3}));
