import pkg from "pg";
import dotenv from "dotenv";
const {Pool} = pkg;
dotenv.config();
export const connection = new Pool({
  connectionString: "postgres://bootcamp_role:senha_super_hiper_ultra_secreta_do_role_do_bootcamp@localhost:5433/boardcamp"
});