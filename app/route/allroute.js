const express = require("express");
const UserController = require("../controller/userController");
const productController = require("../controller/productController");
const EjsController = require("../controller/ejsController");
const router = express.Router();

// its for postman
router.get("/getUser", UserController.getUser);
router.post("/createuser", UserController.createUser);

router.post("/createProduct", productController.craeteProduct);
router.get("/getProduct", productController.getProduct);
router.delete("/productDelete/:id", productController.deleteProduct);
router.patch("/productUpdate/:id", productController.updateProduct);

// ejs router
router.get("/userForm", EjsController.userCraete);
router.get("/productForm", EjsController.ProdcutForm);
router.get("/product/edit/:id", EjsController.productEdit);
router.post("/product/edit/:id", EjsController.handleProductUpdate);
// router with product withname
router.get("/productName", productController.getProductWithName);
router.patch("/productUpdate/:id", productController.updateProduct);

router.get("/", (req, res) => {
  res.redirect("/userForm");
});
module.exports = router;
