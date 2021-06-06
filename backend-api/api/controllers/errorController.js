

//handle email duplicates

const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `A user with that ${field} already exists.`
    res.status(code).send({messages: error, fields: field});
}

//handle field formatting, empty fields, and mismatched passwords

const handleValidationError = (err, res) => {
    var errors = Object.values(err.errors).map(el => el.message);
    var fields = Object.values(err.errors).map(el => el.path);
    const code = 400;

    if(errors.length > 1){
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields})
    }
    else{
        res.status(code).send({messages: errors, fields: fields});
    }
}

module.exports =  function errorController(err, res) {
    try{
        
        console.log('congrates you hit the error middleware');
        console.log(err);
        if(err.name === 'ValidationError') return err =
            handleValidationError(err, res);
        if(err.code && err.code == 11000) return err =
            handleDuplicateKeyError(err, res);
    }
    catch(err){
        res.status(500).send('An unknown error occurred.')
    }

}