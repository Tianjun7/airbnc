const { fetchUser } = require("../models/users")

exports.getUser = async (req,res,next) => {
    const {id} = req.params
    
    const user = await fetchUser(id);
    if(user === undefined){
        res.status(404).send({ msg: "User does not exsist."})
    }
    res.status(200).send({user})
}