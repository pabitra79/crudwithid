const Productschema = require("../model/productSchema");
const productSchema = require("../model/productSchema");

class ProductController {
  async craeteProduct(req, res) {
    try {
      const { Product_name, Product_color, Product_size, userId } = req.body;
      // if (!Product_name || !Product_color || !Product_size || !userId) {
      //   console.log("All feild required");
      // }
      const data = new productSchema({
        Product_name,
        Product_color,
        Product_size,
        userId,
      });
      const newProductData = await data.save();
      // return res.status(201).json({ newProductData });
      if (newProductData) {
        res.redirect("/productName");
      }
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
  //   its get product for normal for json/postman
  async getProduct(req, res) {
    try {
      const product = await Productschema.find();
      return res.status(201).json({
        product,
      });
    } catch (err) {
      return res.status(500).json({ err: "can not find the Product" });
    }
  }

  //   with id or name show the product the details
  async getProductWithName(req, res) {
    try {
      const ProdcutName = await productSchema.aggregate([
        {
          $lookup: {
            from: "usercruds",
            localField: "userId",
            foreignField: "_id",
            as: "userDeatils",
          },
        },
        {
          $unwind: "$userDeatils",
        },
        {
          $project: {
            user_name: "$userDeatils.user_name",
            Product_name: 1,
            Product_color: 1,
            Product_size: 1,
          },
        },
      ]);
      // res.status(201).json({ ProdcutName });
      return res.render("list", {
        title: "user_list",
        data: ProdcutName,
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const { Product_name, Product_color, Product_size, userId } = req.body;
      const updateData = await productSchema.findByIdAndUpdate(id, {
        Product_name,
        Product_color,
        Product_size,
        userId,
      });
      if (updateData) {
        return res.staus(201).json({ updateData });
      }
    } catch (err) {
      return res.status(500).json({ error: "Data Not update" });
    }
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const result = await productSchema.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "Product Not found" });
      }
      // return res.r(200).json({ result });
      return res.render("list", {
        title: "user_list",
        data: ProdcutName,
      });
    } catch (err) {
      return res.status(500).json({ error: "product Not delete" });
    }
  }
}
module.exports = new ProductController();
