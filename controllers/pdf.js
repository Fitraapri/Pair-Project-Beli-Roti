let express = require("express");
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const { Product } = require('../models')

class Pdf {
    static pdfread(req, res) {
        Product.findOne({ where: { id: req.params.id } })
            .then((products) => {
                const input = { name: products.name, price: products.price, stock: products.stock, imageUrl: products.imageUrl, like: products.like }
                ejs.renderFile(path.join(__dirname, '../views/', "report-template.ejs"), { input }, (err, data) => {
                    if (err) {
                        res.send(err);
                    } else {
                        let options = {
                            "height": "11.25in",
                            "width": "8.5in",
                            "padding": "500px",
                            "margin": "auto",
                            "header": {
                                "height": "20mm"
                            },
                            "footer": {
                                "height": "20mm",
                            },
                        };
                        pdf.create(data, options).toFile("invoice.pdf", function (err, data2) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.render('buyForm', {
                                    product: products
                                })
                            }
                        });
                    }
                });
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Pdf