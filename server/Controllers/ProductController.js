const Product = require("../Models/ProductModel");
const path = require("path");
const fs = require("fs");

console.log(process.env.MAIL);

const nodemailer = require("nodemailer");

// create products
const addProduct = async (req, res) => {
  console.log(req.body);

  const { name, price, category, description, brand } = req.body;

  if (
    !name?.trim() ||
    !price?.trim() ||
    !category?.trim() ||
    !description?.trim() ||
    !brand?.trim()
  ) {
    return res.status(400).json({
      error:
        "All fields (name, price, category, description, brand) are required",
    });
  }

  try {
    // Handle image file if provided
    let image;
    let catalog = null;
    if (req.files) {
      image = req.files.productImage[0].path;
      if (req.files.catalogFile) {
        catalog = req.files.catalogFile[0].path;
      }
    } else {
      return res.status(400).json({ message: "Product image is required" });
    }

    console.log(image, catalog, req.files);

    // Create new product
    const product = await Product.create({
      name,
      price,
      category,
      desc: description,
      brand,
      image,
      catalog: catalog,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// get all Products
const getProducts = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const products = await Product.find(
      categoryId ? { category: categoryId } : {}
    )
      .populate("category")
      .sort("-createdAt");
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single products
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (product) {
      res.status(200).json({ success: true, product });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// delete single  products
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      const fileUrl = deletedProduct.image;
      const normalizedPath = path.normalize(fileUrl);

      console.log(`Deleting file at path: ${normalizedPath}`);

      if (fs.existsSync(normalizedPath)) {
        fs.unlink(normalizedPath, async (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res
              .status(500)
              .json({ message: "Error deleting file", error: err.message });
          }
          console.log("deleted product image");

          if (deletedProduct.catalog) {
            const normalizedPathCatalog = path.normalize(
              deletedProduct.catalog
            );
            if (fs.existsSync(path.normalize(normalizedPathCatalog))) {
              fs.unlink(normalizedPathCatalog, async (err) => {
                if (err) {
                  console.error(`Error deleting file: ${err.message}`);
                  return res.status(500).json({
                    message: "Error deleting file",
                    error: err.message,
                  });
                }
              });
            } else {
              const products = await Product.find().populate("category");

              res.json({
                status: true,
                message: "Deleted product",
                products,
              });
            }
            const products = await Product.find().populate("category");
            return res.status(200).json({
              success: true,
              message: "Product deleted successfully",
              products,
            });
          } else {
            const products = await Product.find().populate("category");

            res.json({
              success: true,
              message: "Catalog not found but deleted product",
              products,
            });
          }
        });
      } else {
        console.log("Img not found but deleted product");
        const products = await Product.find().populate("category");

        res.json({
          status: true,
          message: "Img not found but deleted product",
          products,
        });
      }
    } else {
      res.status(404).json({ success: false, message: "product not found." });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, brand } = req.body;

    console.log("Edit Product Request:", { id, name, price, category, description, brand });
    console.log("Files:", req.files);

    // Validate price if it's provided
    if (price !== undefined) {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid positive number",
        });
      }
    }

    // Find the product by ID
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image update if new image is provided
    if (req.files && req.files.productImage) {
      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image); // Delete old image
      }
      product.image = req.files.productImage[0].path;
    }

    // Update only the provided fields
    if (name?.trim()) product.name = name.trim();
    if (price !== undefined) product.price = Number(price);
    if (category) product.category = category;
    if (description?.trim()) product.desc = description.trim();
    if (brand?.trim()) product.brand = brand.trim();

    // Save the updated product
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.log("Edit Product Error:", err);
    return res.status(500).json({ message: err.message });
  }
};

const quote = async (req, res) => {
  try {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      host: "mail.annapurnamediequip.com", // Replace with your SMTP server
      port: 587, // For SSL use port 465, otherwise 587 for TLS
      secure: false, // Set to true for port 465
      auth: {
        user: process.env.MAIL, // Your email address
        pass: process.env.MAIL_PASSWORD, // Your email password
      },
    });

    const adminMailOptions = {
      from: process.env.MAIL,
      to: "account@annapurnamediequip.com",
      subject: `Quote - ${req.body.name}`,
      html: `
        <h3>Received Quote from ${req.body.name} for Product (<strong>${req.body.productName}</strong>).</h3>
        <p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <p>Phone: ${req.body.phone}</p>
        <p>Product Name: ${req.body.productName}</p>
        <p>Country: ${req.body.country}</p>
        <p>Message: ${req.body.message}</p>
      `,
    };

    const clientMailOptions = {
      from: process.env.MAIL,
      to: req.body.email, // Client's email
      subject: `Quote - ${req.body.name}`,
      html: `
        <h1>Quote Received</h1>
        <p>Hello ${req.body.name}. Your Quote for Product (<strong>${req.body.productName}</strong>) has been received. We will reach back to you shortly.</p>
      `,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Email server Error" });
      }
      transporter.sendMail(clientMailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Email server Error" });
        }
        res.json({
          success: true,
          message: "your quote has been sent.",
        });
      });
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const catalogDownload = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const catalogFile = product.catalog;

    // Resolve the full file path
    const catalogFilePath = path.resolve(__dirname, "../", catalogFile);

    if (fs.existsSync(catalogFilePath)) {
      res.sendFile(catalogFilePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          return res.status(500).send("Error sending file");
        }
        console.log("file sent ", catalogFilePath);
      });
    } else {
      res.status(404).json({
        message: "FILE NOT FOUND",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const catalogUpload = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const catalogFile = product.catalog;

    if (req.file) {
      if (catalogFile && fs.existsSync(path.normalize(catalogFile))) {
        console.log("catalog file found ");
        console.log(product, req.file);
        const normalizedPathCatalog = path.normalize(catalogFile);
        fs.unlink(normalizedPathCatalog, async (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res
              .status(500)
              .json({ message: "Error deleting file", error: err.message });
          }
          product.catalog = req.file.path;
          await product.save();
          return res.json({
            success: true,
            message: "Updated Catalog.",
          });
        });
      } else {
        console.log(req.file);
        product.catalog = req.file.path;
        await product.save();
        console.log("uploaded catalog");
        return res.json({
          success: true,
          message: "Uploaded Catalog.",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Error Uploading file",
      });
    }
  } catch (error) {
    console.log("Error Uploading file", error);
    delete req.file;
    return res.status(500).json({ message: error.message });
  }
};

const catalogDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const catalogFile = product.catalog;
    const normalizedPathCatalog = path.normalize(catalogFile);
    fs.unlink(normalizedPathCatalog, async (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return res
          .status(500)
          .json({ message: "Error deleting file", error: err.message });
      }
      product.catalog = null;
      await product.save();
      return res.json({
        success: true,
        message: "Deleted Catalog.",
        product,
      });
    });
  } catch (error) {
    console.log("Error Uploading file", error);
    delete req.file;
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getProductById,
  quote,
  catalogDownload,
  catalogUpload,
  catalogDelete,
};
