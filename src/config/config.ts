import dotenv from "dotenv";

dotenv.config();

const username: string = process.env.username || "";
const password: string = process.env.password || "";
const mongoUrl: string = `mongodb+srv://${username}:${password}@restapidb.i67ryjf.mongodb.net/?retryWrites=true&w=majority`;
const PORT: number = 3000;

export default { username, password, mongoUrl, PORT };
