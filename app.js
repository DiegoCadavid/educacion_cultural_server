import fs from "fs/promises";

// OBSOLETO

/**
 * retorna un número con la longitud especificada
 * @param {Number} _length
 * @returns  number
 */
export const randomValuesLength = (_length = 0) => {
  let value = "";
  for (let i = 0; i < _length; i++) {
    value += Math.ceil(Math.random() * 9);
  }

  return Number(value);
};

/**
 * Devuelve un número a partir de un valor minumo y maximo
 * @params {number} min
 * @params {number} max
 * @returns number
 */
const randomValue = (min, max) => min + Math.ceil(Math.random() * (max - min));

/**
 * Generar un objecto mediante los valores predeterminados
 * @param { Object } config
 * @returns Object
 */
const generateRegister = (config) => {
  let register = {};
  const defaultKeys = Object.keys(config);
  defaultKeys.forEach((key) => {
    const value = config[key];
    if (Number(value) !== NaN) {
      register[key] = randomValuesLength(value);
    }

    if (value?.min) {
      if (value?.type === "date") {
        // Si es una fecha
        // DD-MM-YYYY
        register[key] = `${randomValue(0, 31)}-${randomValue(
          0,
          12
        )}-${randomValue(value.min, value.max)}`;
      } else {
        register[key] = randomValue(value.min, value.max);
      }
    }
    if (value.length) {
      register[key] = value[randomValue(0, value.length) - 1];
    }
  });

  return register;
};

/**
 * Returna un array
 * @param {Number} max
 * @param { Object } config
 * @returns  Array
 */
export const generateRegisters = (max = 10, config) => {
  const registers = [];
  for (let i = 0; i <= max; i++) {
    registers.push(generateRegister(config));
  }

  // Lo guardamos en la base de datos
  console.log(config.name);
  database[config.name] = registers;
  return registers;
};

/**
 * Escribe archivo plano delimitado por ";"
 * @param { Number } max
 * @param { Object } config
 * @retuns void
 */
export const generateFile = async (max = 10, config) => {
  const registers = generateRegisters(max, config);
  const contentFile = registers.map((register) => {
    return Object.values(register).join(";");
  });

  try {
    const filename = new Date().getTime();
    const path = `./out/${filename}.txt`;

    await fs.writeFile(path, contentFile.join("\n"));
    console.log(`Nombre: ${filename}.txt\nRuta:${path}`);
  } catch (error) {
    console.log("Error al generar el archivo");
  }
};
