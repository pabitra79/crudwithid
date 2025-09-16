const express = require("express");
const UserController = require("../controller/userController");
const productController = require("../controller/productController");
const EjsController = require("../controller/ejsController");
const router = express.Router();

// API routes for Postman (using proper HTTP methods)
router.get("/getUser", UserController.getUser);
router.post("/createuser", UserController.createUser);
router.post("/createProduct", productController.craeteProduct);
router.get("/getProduct", productController.getProduct);
router.delete("/api/productDelete/:id", productController.deleteProduct); // API delete
router.patch("/productUpdate/:id", productController.updateProduct);

// EJS routes
router.get("/userForm", EjsController.userCraete);
router.get("/productForm", EjsController.ProdcutForm);
router.get("/product/edit/:id", EjsController.productEdit);
router.post("/product/edit/:id", EjsController.handleProductUpdate);
router.get("/productName", productController.getProductWithName);
router.post("/productDelete/:id", productController.deleteProduct);

router.get("/", (req, res) => {
  res.redirect("/userForm");
});

module.exports = router;
