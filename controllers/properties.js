const { fetchProperties, fetchPropertyById } = require("../models/properties")

exports.getProperties = async (req, res, next) => {
    const { query } = req
    console.log(query)
    
    const properties = await fetchProperties(query);
    res.status(200).send({ properties })
}

exports.getPropertyById = async (req,res,next) => {
    const {id} = req.params

    const property = await fetchPropertyById(id)
    if(property === undefined){
        res.status(404).send({ msg: "Property does not exsist."})
    }
    res.status(200).send({ property })
}