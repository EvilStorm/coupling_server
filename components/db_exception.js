class DBException extends Error {
    constructor(code, message, reason, ...params) {
        super(...params);

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, DBException)
        }

        this.code = code
        this.message = message
        this.reason = reason
    }
}

module.exports = DBException