import database from "./database.js";

class Model {
  constructor(name = "", schema = {}) {
    this.name = name;

    // Instanciamos en la categoria si no existe
    if (!database[this.name]) {
      database[this.name] = [];
    }

    // Referenciamos directamente
    this.data = database[this.name];
  }

  /**
   * Retorna todos los registros
   */
  findAll(){
    return this.data || [];
  }

  /**
   * Devuelve el registro a partir de su id si existe
   * @returns {Object}
   */
  find(id) {
    return this.data.filter((item) => item.id === id)[0] || null;
  }

  /**
   * Inserta un nuevo registro
   */
  create(body) {
    const id = this.data.length + 1;
    const bodyModel = {
      id,
      ...body,
    };
    this.data.push(bodyModel);

    return bodyModel;
  }


  findByKey (key, value) {
    return this.data.filter( item => item[key] === value ) || [];
  }

  /**
   * Si el registro existe lo elimina y crea uno nuevo con la información actualizada
   */
  update(id, data) {
      const document = this.find(id);
      
      if(!document) {
        return null;
      }

      // Removemos el elemento del
      const newData = this.data.filter( (item) => item.id !== id )
      this.data = newData;

    const updateKeys = Object.keys(data).filter(key =>  Object.keys(document).includes(key));
    updateKeys.forEach(key => {
      document[key] = data[key];
    })

    this.data.push(document);
  }
}

export default Model;

