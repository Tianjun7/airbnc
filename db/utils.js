function createUsersRef(users){
    const ref = {};
    
    for(let i = 0; i < users.length; i++){
        const name = users[i].first_name + " " + users[i].surname;
        ref[name] = users[i].user_id;
    }

    return ref;
}

function createPropertyRef(properties){

}

module.exports = { createUsersRef, createPropertyRef};