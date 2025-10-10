exports.handlePathNotFound = (req,res,next) => {
    res.status(404).send({ msg: "Path not found."})
}

exports.handleServerErrors = (err,req,res,next) => {
    res.status(500).send({ msg: "Server error>"})
}