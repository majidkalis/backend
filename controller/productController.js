const express = require('express');
const Product = require("../models/product")

exports.addProduct = async(req, res) => {
    try {
     const {name, descriptions, category} = req.body
     if(!name, !descriptions, !category) {
        return res.status(400).json({
            message: "All fields requirs",
        });
     }

     const productExist = await Product.findOne({name});
     console.log("productExist", productExist);
     if(productExist) {
        return res.status(400).json({
            message :"Product already exist"
        });
     }
       const product = await Product.create({
        name,
        descriptions,
        category,
       
       });
       console.log(`product created data ${product}`);
       if(product){
        res.status(201).json({ _id : product.id, eamil : product.email
        });
       }

    }
    catch (error){
       console.error(error);
       return res.status(500).json({
        message : "Invalid product data"
       })
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
          console.log("all products", products)
        if (!products || products.length === 0) {
            return res.status(404).json({
                message: "No products found"
            });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

exports.getsingleProduct = async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findById(id, req.body);
       console.log(product)
       res.status(200).json(product);
       if(!product) {
          res.status(404).json({message : "product not fount"})
       }
    }
      
    catch(err) {
         res.status(404).json({message : err.message})
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const product = await Product.findByIdAndUpdate(id, req.body);
        console.log(product);

        if (!product) {
           return  res.status(404).json({ message: "Product not found!" });
        }

        updatedProduct = await Product.findById(id);
        res.status(201).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteProduct = async(req, res) => {
    try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if(!product) {
        return res.status(404).json({message : "product not found"});
    }
    return res.status(201).json({message : "product deleted successfully"});
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
}
