var Customerdb = require('../models/customer');
var nodemailer = require('nodemailer');

const axios = require('axios')

// RENDER
// render new customer page
exports.newCustomerRender = (req,res)=>{
    res.render('customers/new', { customer: new Customerdb() })
}

// render edit customer by id page
exports.editByIdCustomerRender = async (req,res)=>{
    const customer = await Customerdb.findById(req.params.id)
    res.render('customers/edit', { customer: customer })
}

// render read more customer by id page
exports.readMoreByIdCustomerRender = async (req,res)=>{    
    const customer = await Customerdb.findById(req.params.id)
    if (customer == null) res.redirect('/customers')
    res.render('customers/show', { customer: customer })
}


// render all customers customer page
exports.allCustomersRender = async (req,res)=>{
    let status = [req.query.status || []].flat();
    let date = [req.query.date || "desc"].flat();
    let search = [req.query.search || ""].flat();
    let customers   
    sendEmail() 
    
    if (search != '')
    {   
        let regex = new RegExp(search,'i');     
        if(status.length > 0){
            customers = await Customerdb.find({ $and: [ { $or: [{firstName: regex },{lastName: regex}] }, {status: status} ] }).sort({ createdAt: date })     
        } else{
            customers = await Customerdb.find({ $or: [{firstName: regex },{lastName: regex}] }).sort({ createdAt: date }) 
        }
    } else {
        if(status.length > 0){
            customers = await Customerdb.find({ status: status }).sort({ createdAt: date }) 
        } else{
            customers = await Customerdb.find({}).sort({ createdAt: date }) 
        }
    }       

    res.render('customers/index', { customers: customers })
}



////////////////////////////////////////////////////////////////////////////////
// CRUD

function sendEmail() {
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: 'login@gmail.com',
            pass: 'pass'
        }
    };

    var mailOptions = {
        from: 'pawlukowiczkarol97@gmail.com',
        to: 'kpawlukowicz@onet.pl',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: "<b>That was easy! </b>" 
    };

    var transporter = nodemailer.createTransport(smtpConfig);

   /* transporter.verify((err, success) => {
        if (err) console.error(err);
        console.log('Your config is correct');
    });*/

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

// create and save new customer
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new customer
    const customer = new Customerdb({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        status : req.body.status,
        description : req.body.description
    })

    // save customer in the database
    customer
        .save(customer)
        .then(data => {
            //res.send(data)
            sendEmail()
            res.redirect('/customers');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}



// Update customer by customer id
exports.update = async (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Customerdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}



// Delete a customer with specified id 
exports.delete = async (req, res)=>{
    const id = req.params.id;

    Customerdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "customer was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete customer with id=" + id
            });
        });
}