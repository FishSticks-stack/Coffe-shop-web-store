
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const ct1products = require('../models/ct1products');
const ct2products = require('../models/ct2products');
const ct3products = require('../models/ct3products');
const Cart = require('../models/cart');
const User = require('../models/user');

const router = express.Router();

router.get('/eats', (req, res) => {
    ct1products.find()
    .then(results => {
        res.render('eats', {products: results, pageTitle: 'Eats'});
    })
    .catch(err => console.log(err));  
}); 

router.get('/eats/:prodId', (req, res) => {
    ct1products.findById(req.params.prodId)
        .then(result => {
            res.render('eats-details', {prod: result, pageTitle: 'One of the Eats'});
        })
        .catch(err => console.log(err));  
});

router.get('/tea', (req, res) => {
    //res.render('family');
    ct2products.find()
    .then(results => {
        res.render('tea', {products: results, pageTitle: 'Tea'});
    })
    .catch(err => console.log(err));  
});

router.get('/tea/:prodId', (req, res) => {
    ct2products.findById(req.params.prodId)
        .then(result => {
            res.render('tea-details', {prod: result, pageTitle: 'One of the Teas'});
        })
        .catch(err => console.log(err));  
});

router.get('/coffee', (req, res) => {
    //res.render('coffee');
    ct3products.find()
    .then(results => {
        res.render('coffee', {products: results, pageTitle: 'Coffee'});
    })
    .catch(err => console.log(err));  
});

router.get('/coffee/:prodId', (req, res) => {
    ct3products.findById(req.params.prodId)
        .then(result => {
            res.render('coffee-details', {prod: result, pageTitle: 'One of the Coffees'});
        })
        .catch(err => console.log(err));  
});

router.get('/contactUs', (req, res) => {
    res.render('contactUs');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/view-cart', (req, res) => {
    Cart.find()
    .then(results => {
        res.render('view-cart', {products: results, pageTitle: 'All Items in Cart'});
    })
    .catch(err => console.log(err)); 
});

//Increasing button
router.get('/increase/:itemId', (req, res) => {
    Cart.findOneAndUpdate( { itemId: req.params.itemId }, {$inc: {quantity: 1}}, 
        function(err, doc) {
            if (err) { console.log("err"); }
            retrieveAllFromCart(res);
        });
});

//decreasing button
router.get('/decrease/:itemId', (req, res) => {
    Cart.findOneAndUpdate( { itemId: req.params.itemId}, {$inc: {quantity: -1}},
        function(err, doc) { if (err) { console.log("err"); }
        retrieveAllFromCart(res);
    });
    Cart.findOneAndDelete({quantity: 0}, function(err, doc) {
        if (err) { console.log("err"); }
        retrieveAllFromCart(res);
    });
});

//delete button
router.get('/remove/:itemId', (req, res) => {
    Cart.findOneAndDelete( { itemId: req.params.itemId }, 
        function(err, doc) {
            if (err) { console.log("err"); }
            retrieveAllFromCart(res);
        });
});

function retrieveAllFromCart(res) {
    Cart.find()
        .then(results => {
            res.render('view-cart', {products: results, pageTitle: 'All Items in Cart'});
        })
        .catch(err => console.log(err));
}

router.post('/add-cart', (req, res) => {
    const itemId = req.body.id;
    var prod = ct1products;

    if(req.body.catId == 'tea') {
        prod = ct2products;
    }
    else if(req.body.catId == 'coffee') {
        prod = ct3products;
    }

    prod.findById(itemId)
        .then(result => {
            Cart.findOneAndUpdate({itemId: itemId}, {$inc: {quantity: 1}},
                function(err, doc) { if (err){console.log("err"); }
                if (doc == null){
                    var item = { itemId: itemId, title: result.title, price: result.price, quantity: 1, img: result.img};
                    Cart.collection.insertOne(item); }
                });
            })        
            //console.log('Insertion Success'); })
        .catch(err => console.log(err));
});

router.get('/checkout', (req, res) => {
    res.render('checkout');
});

router.get('/guest-checkout', (req, res) => {
    res.render('guest-checkout');
});

function retrieveAllFromCart(res)
{
    Cart.find()
            .then(results => {
                res.render('view-cart', {products: results, pageTitle: 'All Items in Cart'}); })
            .catch(err => console.log(err));
}

router.get('/view-sign-up', (req, res) => {
    res.render('view-sign-up');
});

router.post('/sign-up', (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pass: req.body.pass,
        phone: req.body.phone,
        address: {add1: req.body.add1,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip}
    });

    user.save();
    res.render('view-sign-up');
});

//thank you page
router.get('/thankyou', (req, res) => {
    res.render('thankyou');
    
});

//signed in checkout page
router.get('/signed-in-checkout', (req, res) => {
    const email = req.body.email;
    var user = User;
    console.log(email);
    user.find(email)
    .then(result => {
        res.render('signed-in-checkout', {user: result});
        console.log(result);
    })
    .catch(err => console.log(err)); 
});

//review cart page
router.get('/review-cart', (req, res) => {
    Cart.find()
    .then(results => {
        res.render('review-cart', {products: results, pageTitle: 'Review Items in Cart'});
    })
    .catch(err => console.log(err)); 
});

//confirmation page
router.get('/confirmation', (req, res) => {
    Cart.find()
    .then(results => {
        res.render('confirmation', {products: results, pageTitle: 'Confirmation Page'});
    })
    .catch(err => console.log(err)); 
});

//edit cart page
router.get('/edit-cart', (req, res) => {
    Cart.find()
    .then(results => {
        res.render('edit-cart', {products: results, pageTitle: 'Edit Items in Cart'});
    })
    .catch(err => console.log(err)); 
});

router.get('/eats', (req, res) => {
    ct1products.find()
    .then(results => {
        res.render('eats', {products: results, pageTitle: 'Eats'});
    })
    .catch(err => console.log(err));  
}); 

router.get('/eats/:prodId', (req, res) => {
    ct1products.findById(req.params.prodId)
        .then(result => {
            res.render('eats-details', {prod: result, pageTitle: 'One of the Eats'});
        })
        .catch(err => console.log(err));  
});

module.exports = router;

