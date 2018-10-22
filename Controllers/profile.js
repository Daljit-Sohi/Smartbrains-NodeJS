const getProfile = (req, res, db) =>{
    const { id } = req.params;

    db.select('*').from('users').where({id: id})
    .then(user => {
        if(user.length){ // > 0
            res.json(user[0])
        }
        else {
            res.json({
                message: `user with id ${id}, doesn't exits`
            })
        }
    })
    .catch(err => {
        res.status(400).json({
            message: "error fetching user info"
        })
    });

    // if(!found){
    //     res.status(404).json({
    //         message: 'no such user'
    //     });
    // }
}

module.exports = {
    handleProfileGet: getProfile
}