class Logger {
    constructor() {}

    public log(context, status = 200) {
        const { httpMethod, resourcePath, requestId, requestTime } = context;
        console.log(`---LOG---\n${httpMethod} ${resourcePath}\nStatus: ${status}\nRequest ID: ${requestId}\nRequest Time: ${requestTime}`)
    }
}

export default new Logger();