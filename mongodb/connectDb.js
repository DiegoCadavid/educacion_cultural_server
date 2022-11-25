import { connect } from "mongoose";

const connectDb = async () => {
  try {
    const url = process.env.MONGOURL;
    await connect(url);
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    console.log("Error al conectar con la base de datos");
  }
};

export default connectDb;
