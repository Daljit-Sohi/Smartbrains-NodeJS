const Clarifai = require('clarifai');


//Always Add the API-KEY on the Backend --> **MAJOR SECURITY**
const app = new Clarifai.App({
    apiKey: "502f742614a54f4d95da97846da82c47"
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
/** 
    let found = false;

    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }        
    })
    if(!found){
        res.status(404).json({
            message: 'not found'
        });
    }
*/

    //Updating our Entries
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));

}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}