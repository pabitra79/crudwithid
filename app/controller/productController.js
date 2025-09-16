const productSchema = require("../model/productSchema");

class ProductController {
  async craeteProduct(req, res) {
    try {
      const { Product_name, Product_color, Product_size, userId } = req.body;

      const data = new productSchema({
        Product_name,
        Product_color,
        Product_size,
        userId,
      });

      const newProductData = await data.save();

      if (newProductData) {
        return res.redirect("/productName");
      }
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await productSchema.find();
      return res.status(200).json({ product });
    } catch (err) {
      return res.status(500).json({ err: "Cannot find the Product" });
    }
  }

  async getProductWithName(req, res) {
    try {
      const products = await productSchema.aggregate([
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

      return res.render("list", {
        title: "user_list",
        data: products,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
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
        return res.redirect("/productName");
      }
    } catch (err) {
      return res.status(500).json({ error: "Data not updated" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const result = await productSchema.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.redirect("/productName");
    } catch (err) {
      return res.status(500).json({ error: "Product not deleted" });
    }
  }
}

module.exports = new ProductController();
