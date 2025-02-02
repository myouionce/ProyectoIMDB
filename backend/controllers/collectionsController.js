var genders = require('../models/movieGender');

const collectionsCtrl = {};

collectionsCtrl.getGender = async (req,res)=>{
    try{
        const movieGenders = await genders.find({});

        if (!movieGenders) {
            return res.status(404).send({ message: 'No se encontraron generos' });
        }
        return res.status(200).send({ movieGenders });
    }catch(err){

    }

}
module.exports = collectionsCtrl;