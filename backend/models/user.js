var mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    "name": {type:String,required: true},
    "correo": {type:String,required: true},
    "contrasena": {type:String,required: true}
});

UserSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

UserSchema.methods.matchPassword = async function (password){
    
    return await bcrypt.compare(password,this.contrasena);
}

module.exports = mongoose.model('usuarios', UserSchema);