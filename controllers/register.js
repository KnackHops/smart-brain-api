const registerHandler = (db, bcrypt) => (req,res) => {
    
 const { name, username, email, password } = req.body;
    
    if(!name || !username || !email || !password){
        return res.status(400).json('Error Registering on backend');
    }
    
    bcrypt.hash(password, 10, function(err, hash) {
        db.transaction(trx=>{
        trx.insert({username, email, hash})
        .into('login')
        .returning('email')
        .then(retEmail =>{
            return trx('users')
            .insert({
                username: username,
                name: name,
                email: retEmail[0],
                joined: new Date()
            })
            .returning('*')
            .then(data=>{
                res.json(data[0]);
            })
            .catch(err=>res.status(400).json('Error registering1'))
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err=>res.status(400).json('Error registering'));
})
}

module.exports = {
    registerHandler
}