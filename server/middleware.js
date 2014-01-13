/**
* Module dependencies
*/
 
 
/**
* Options:
* - stack: show stack in error message ?
* - log: logging function
*/
exports.errorHandler = function (options) {
	var log = options.log || console.error
	, stack = options.stack || false
	return function (err, req, res, next) {
		log(err.message);
		if (err.stack) log(err.stack);
		var content = err.message;
		if (stack && err.stack) content += '\n' + err.stack;
		var code = err.code || (err.type == 'ENOTFOUND' ? 404 : 500);
		res.respond(content, code);
	}
}
 
/**
* Checks Accept and Content-Type headers
*/
exports.checkRequestHeaders = function (req, res, next) {
	if (!req.accepts('application/json'))
		return res.respond('You must accept content-type application/json', 406);
	if ((req.method == 'PUT' || req.method == 'POST') && req.header('content-type') != 'application/json')
		return res.respond('You must declare your content-type as application/json', 406);
	return next();
}
 

 
/**
* Catch and transform bodyParser SyntaxError
*/
exports.handleBodyParserError = function (err, req, res, next) {
	if (err instanceof SyntaxError) res.respond(err, 400);
	else next(err);
}

