export function logger1(req, res, next) {
    console.log(`Request...logger1`);
    next();
}



export function logger2(req, res, next) {
    console.log(`Request...logger2`);
    next();
}


export function globalLogger(req, res, next) {
    console.log(globalLogger.name, `全局中间件globalLogger`)
    next();
}

