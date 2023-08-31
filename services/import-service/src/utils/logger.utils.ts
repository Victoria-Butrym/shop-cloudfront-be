class Logger {
    constructor() {}

    public log(text, data?, errorMessage?) {
        console.log(text);
        console.log('---Data---', data);
        errorMessage && console.log(`---ERROR--- ${errorMessage}`);
    }

    public error(errorMessage) {
        console.log(`---ERROR--- ${errorMessage}`);
    }
}

export default new Logger();