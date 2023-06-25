const { Router } = require('express');
const router = Router();
const libraryCtrl =  require('../controller/library.controller');

//Endpoints de usuario.
router.post("/register", libraryCtrl.registerUser);
router.post("/login", libraryCtrl.loginUser);

//Endpoints de libros.
// router.get("/books", libraryCtrl.getBook);
// router.post("/books", libraryCtrl.postBook);
// router.put("/books", libraryCtrl.putBook);
// router.delete("/books", libraryCtrl.deleteBook);

module.exports = router;