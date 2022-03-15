const DBException = require('./db_exception');
const NotFoundException = require('./exception_not_found');

const exceptionHandler = (err, rep, res, next) => {

    if(err instanceof DBException) {
        return res.status(805).json(err)
    } else if( err instanceof NotFoundException) {
        return res.status(804).json(err)
    }
    
    return res.status(800).json(err)  
}

module.exports = {
    exceptionHandler
}