const userSchema = require("../model/userSchmea");
const productSchema = require("../model/productSchema");

class EjsController {
  // user form
  async userCraete(req, res) {
    try {
      return res.render("userFrom", {
        title: "user_form",
      });
    } catch (error) {
      console.error("Error rendering user form:", error);
      return res.status(500).send("Error loading user form");
    }
  }
  //   Productform
  async ProdcutForm(req, res) {
    try {
      const user = await userSchema.find();
      return res.render("productForm", {
        title: "Product_form",
        user,
      });
    } catch (error) {
      console.error("Error rendering product form:", error);
      return res.status(500).send("Error loading product form");
    }
  }
  //   editpage
  async productEdit(req, res) {
    const id = req.params.id;
    try {
      const editdata = await productSchema.findById(id);
      if (!editdata) {
        return res.status(404).json({ message: "Prodcut not found" });
      }
      res.render("editpage", {
        title: "edit_product_page",
        data: editdata,
        user: await user.find(),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error fetching product" });
    }
  }
  async handleProductUpdate(req, res) {
    const id = req.params.id;
    try {
      const { product_name, color, size, user_id } = req.body;

      const updateData = await productSchema.findByIdAndUpdate(
        id,
        {
          Product_name: product_name,
          Product_color: color,
          Product_size: size,
          userId: user_id,
        },
        { new: true }
      );

      if (updateData) {
        return res.redirect("/productName");
      } else {
        return res.status(404).send("Product not found");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).send("Error updating product");
    }
  }
}
module.exports = new EjsController();
