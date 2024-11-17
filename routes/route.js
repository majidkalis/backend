const express = require('express')
const router = express.Router();
const controller = require("../controller/productController");

router.post("/addProduct", controller.addProduct);
router.get("/getAll", controller.getAllProduct);
router.get("/getProduct/:id", controller.getsingleProduct);
router.put("/updateProduct/:id",controller.editProduct);
router.delete("/deleteProduct/:id", controller.deleteProduct)


module.exports = router