const {pool} = require('../database');

//Funciones de gestión de libros
//Obtener los libros de un usuario
async function getBooks (req, res){
    
    //recogemos los datos de usuario por la query
    const {id_user, id_book} = req.query;
    const params = [id_user, id_book];

    //seleccionamos todos los libros cuyo id_user sea igual que el usuario logeado
    let sql = `SELECT * FROM book WHERE id_user = ?;`;

    //seleccionamos un libro del usuario si se selecciona su id
    if (id_book != undefined){
        sql = `SELECT * FROM book WHERE id_user = ? AND id_book = ?;`;
    }
    
    try {
        //peticion sql a la BBDD
        //devuelve un array de libros result = Book[]
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
    console.log(error); 
    }
}

//Obtener los libros de un usuario
async function postBook (req, res){
    
    //recogemos los datos del libro a añadir por el body
    const {id_user, title, type, author, price, photo} = req.body;
    const params = [id_user, title, type, author, price, photo];

    //añadimos el nuevo libro
    let sql= `INSERT INTO book (id_user,title,type,author,price,photo) VALUES (?,?,?,?,?,?);`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
    console.log(error); 
    }
}

async function putBook (req, res){
    
    //recogemos los datos del libro a modificar por el body
    const {id_book, id_user, title, type, author, price, photo} = req.body;
    const params = [
        title? title: null,
        type? type: null,
        author? author: null,
        price? price: null,
        photo? photo: null,
        id_book? id_book: null,
        id_user? id_user: null,
    ];

    //modificamos la informacion del libro
    let sql = `UPDATE book SET title = COALESCE(?,title), type = COALESCE(?,type), author = COALESCE(?,author), price = COALESCE(?,price), photo = COALESCE(?,photo) WHERE id_book = ? AND id_user = ?;`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        console.log(result);
        res.send(result);
    } 
    catch (error) {
    console.log(error); 
    }
}

async function deleteBook (req, res){
    
    //recogemos los datos del libro a añadir por el body
    const {id_book} = req.body;
    const params = [id_book,];

    //añadimos el nuevo libro
    let sql= `DELETE FROM book WHERE id_book = ?`;

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
    } 
    catch (error) {
    console.log(error); 
    }
}

module.exports = { getBooks, postBook, putBook, deleteBook };