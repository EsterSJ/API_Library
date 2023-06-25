const { Router } = require('express');
const router = Router();
const libraryCtrl =  require('../controller/library.controller');
const booksCtrl = require('../controller/books.controller');

//Endpoints de usuario.
router.post("/register", libraryCtrl.registerUser);
router.post("/login", libraryCtrl.loginUser);

//Endpoints de libros.
router.get("/books", booksCtrl.getBooks);
router.post("/books", booksCtrl.postBook);
router.put("/books", booksCtrl.putBook);
router.delete("/books", booksCtrl.deleteBook);

module.exports = router;