var Partdb = require('../models/part');

// RENDER
// render new part page
exports.newPartRender = (req,res)=>{
    res.render('parts/new', { part: new Partdb() })
}

// render edit Part by id page
exports.editByIdPartRender = async (req,res)=>{
    const part = await Partdb.findById(req.params.id)
    if (part == null) res.redirect('/parts')
    res.render('parts/edit', { part: part })
}

// render read more Part by id page
exports.readMoreByIdPartRender = async (req,res)=>{    
    const part = await Partdb.findById(req.params.id)
    if (part == null) res.redirect('/parts')
    res.render('parts/show', { part: part })
}

// render all Parts Part page
exports.allPartsRender = async (req,res)=>{
    let status = [req.query.status || []].flat();
    let date = [req.query.date || "desc"].flat();
    let search = [req.query.search || ""].flat();
    let parts   
        
    if (search != '')
    {   
        let regex = new RegExp(search,'i');     
        parts = await Partdb.find( { $or: [ {name: regex },{description: regex} ] } ).sort({ createdAt: date })         
    } else {
        parts = await Partdb.find({}).sort({ createdAt: date }) 
    }

    res.render('parts/index', { parts: parts })
}










////////////////////////////////////////////////////////////////////////////////
// CRUD

// create and save new part
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new part
    const part = new Partdb({
        name : req.body.name,
        description : req.body.description,
    })

    // save part in the database
    part
        .save(part)
        .then(data => {
            res.redirect('/parts');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}



// Update part by part id
exports.update = async (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Partdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update part with ${id}. Maybe user not found!`})
            }else{                
                res.redirect('/parts');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


// Delete a part with specified id 
exports.delete = async (req, res)=>{
    const id = req.params.id;

    Partdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.redirect('/parts');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete part with id=" + id
            });
        });
}
