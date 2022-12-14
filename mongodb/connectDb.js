import moongose,  { connect } from "mongoose";
import idPlugin from 'mongoose-id'
const connectDb = async () => {
  try {
    const url = process.env.MONGOURL;
    await connect(url);
    moongose.plugin(idPlugin);
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    console.log("Error al conectar con la base de datos");
  }
  
};

export default connectDb;
