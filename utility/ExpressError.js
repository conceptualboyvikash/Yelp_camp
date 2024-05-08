class ExpressError extends Error{
    constructor(msg,sc)
    {
        super();
        this.message=msg;
        this.statusCode=sc;
    }
}
module.exports=ExpressError;