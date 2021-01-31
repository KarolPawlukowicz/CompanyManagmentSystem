var TVdb = require('../models/tv');

// RENDER
// render new Tv page
exports.newTvRender = (req,res)=>{
    res.render('tvs/new', { tv: new TVdb() })
}

// render edit Tv by id page
exports.editByIdTvRender = async (req,res)=>{
    const tv = await TVdb.findById(req.params.id)
    if (tv == null) res.redirect('/tvs')
    res.render('tvs/edit', { tv: tv })
}

// render read more Tv by id page
exports.readMoreByIdTvRender = async (req,res)=>{    
    const tv = await TVdb.findById(req.params.id)
    if (tv == null) res.redirect('/tvs')
    res.render('tvs/show', { tv: tv })
}

// render all Tvs Tv page
exports.allTvsRender = async (req,res)=>{
   /* let status = [req.query.status || []].flat();
    let date = [req.query.date || "desc"].flat();
    let search = [req.query.search || ""].flat();
    let customers   
        
    if (search != '')
    {   
        let regex = new RegExp(search,'i');     
        if(status.length > 0){
            customers = await Customerdb.find({ $and: [ { $or: [ {firstName: regex },{lastName: regex},{email: regex} ] }, {status: status} ] }).sort({ createdAt: date })     
        } else{
            customers = await Customerdb.find({ $or: [ {firstName: regex },{lastName: regex},{email: regex} ] }).sort({ createdAt: date }) 
        }
    } else {
        if(status.length > 0){
            customers = await Customerdb.find({ status: status }).sort({ createdAt: date }) 
        } else{
            customers = await Customerdb.find({}).sort({ createdAt: date }) 
        }
    }*/

    tvs = await TVdb.find({}).sort({ createdAt: date }) 

    res.render('tvs/index', { tvs: tvs })
}










////////////////////////////////////////////////////////////////////////////////
// CRUD

// create and save new customer
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new tv
    const tv = new TVdb({
        brandName : req.body.brandName,
        model : req.body.model,
        inch : req.body.inch,
        status : req.body.status,
        description : req.body.description
    })

    // save customer in the database
    tv
        .save(tv)
        .then(data => {
            res.redirect('/tvs');
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
    TVdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{                
                res.redirect('/tvs');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


// Delete a customer with specified id 
exports.delete = async (req, res)=>{
    const id = req.params.id;

    TVdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.redirect('/tvs');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete customer with id=" + id
            });
        });
}
