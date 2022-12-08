import { connection } from "../database/db.js";
export async function listCategories(req, res)  {
    try {const produtos = await connection.query("SELECT * FROM categories");
    res.send(produtos.rows);
} catch(err){
    res.status(501).send(err);
}
};
export async function insertCategories (req, res)  {
    const {name} = req.body;
    try {const insertion = await connection.query("INSERT INTO categories (name) VALUES($1)", [name]);
    res.send(insertion);
} catch(err){
    res.status(501).send(err);
}
};