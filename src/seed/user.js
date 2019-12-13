const User = require('../app/models/User');

module.exports.User = async () => {

    try{
        if (!await User.findOne({ "Email": "master@administrador.com" })){
            console.log('Add Usuario Master');
            await Usuario.create({
                "Name": "Master",
                "Email": "master@administrador.com",
                "Password": "Hora_Ponto_2019"
            });
        }
        else{
            console.log("Master já existe.");
        }
    }
    catch (erro) {
        console.error(erro);
    }

};
