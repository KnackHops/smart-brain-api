const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: '4eda86bd8e624e88ae44ca8c2a752301'
})

const imageApiHandler = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>res.json(data))
    .catch(err=>res.status('400').json("api handling failed"));
}

const imageHandler = (db) => (req,res) => {
    const { id } = req.body;
    
    db('users')
        .where({id})
        .increment('entries',1)
        .returning('entries')
        .then(entr => {
            if(entr.length){
                res.json(entr[0]);
            }
            res.status(400).json('user not found');
        })
        .catch(err => res.status(400).json('error getting entries'));
}

module.exports = {
    imageHandler,
    imageApiHandler
}