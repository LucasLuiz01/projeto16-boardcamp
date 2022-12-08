import { connection } from "../database/db.js";
export async function listCategories(req, res)  {
    const a = "Jose";
    try {const produtos = await connection.query(`SELECT * FROM categories`,);
    res.send(produtos.rows);
} catch(err){
    res.status(501).send(err);
}
};
export async function insertCategories (req, res)  {
    const {name} = req.body
    const validation = await connection.query(`SELECT * FROM categories WHERE name = '${name}'`);
    if(validation.rows.length > 0){
        return res.sendStatus(409);
    }
    try {const insertion = await connection.query("INSERT INTO categories (name) VALUES($1)", [name]);
    res.send(insertion);
} catch(err){
    res.status(501).send(err);
}
};