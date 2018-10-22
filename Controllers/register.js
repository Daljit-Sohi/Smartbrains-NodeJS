const handleRegister = (req, res, db, bcrypt) =>{

    const {email, name, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json('Incorrect Submission');
    }
    
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash, 
            email: email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0], 
                name: name,
                joined: new Date()  
            })
            .then(response => {
                res.status(200).json({
                    message: "New User Created", 
                    newUser: response[0]
                });
            })
        })
        .then(trx.commit) //send the transaction through
        .catch(trx.rollback) //if an error occurs, roll back
    }) //ending transaction    
    .catch(err => {
        console.log('Error', err);
        res.status(400).json({
            message: "A user with this email already exits!"
        });       
    });
}; //end handleRegister

module.exports = {
    handleRegister: handleRegister
}