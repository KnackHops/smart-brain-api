const signinHandler = (db, bcrypt) => (req, res) =>{
    const { username, password } = req.body;
    
    db('login')
    .where('username',username)
    .then(data=>{
        bcrypt.compare(password, data[0].hash).then(resp=>{
            if(resp){
                db('users')
                .where('username',username)
                .then(user=>res.json(user[0]))
                .catch(err=>res.status(400).json(err));
            }else{
                res.status(400).json('password does not match');
            }
        })
    })
    .catch(err=>res.status(400).json('username does not exist'));
    
}

module.exports={
    signinHandler
}