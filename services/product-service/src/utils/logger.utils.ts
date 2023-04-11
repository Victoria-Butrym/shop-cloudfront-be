class Logger {
    constructor() {}

    public log(context, status = 200, errorMessage?) {
        const { httpMethod, resourcePath, requestId, requestTime } = context;
        console.log(`---LOG---\n${httpMethod} ${resourcePath}\nStatus: ${status}\nRequest ID: ${requestId}\nRequest Time: ${requestTime}`);
        errorMessage && console.log(`---ERROR--- ${errorMessage}`);
    }
}

export default new Logger();