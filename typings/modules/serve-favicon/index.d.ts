// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/cd4debea25a280da0808d4ff2ca5a4bdb34bd28b/serve-favicon/index.d.ts
declare module 'serve-favicon' {
// Type definitions for serve-favicon 2.2.0
// Project: https://github.com/expressjs/serve-favicon
// Definitions by: Uros Smolnik <https://github.com/urossmolnik/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* =================== USAGE ===================

    import serveFavicon = require('serve-favicon');
    app.use(serveFavicon(__dirname + '/public/favicon.ico'));

 =============================================== */




import express = require('express');

/**
 * Node.js middleware for serving a favicon.
 */
function serveFavicon(path: string, options?: {
    /**
    * The cache-control max-age directive in ms, defaulting to 1 day. This can also be a string accepted by the ms module.
    */
    maxAge?: number;
}): express.RequestHandler;

namespace serveFavicon { }

export = serveFavicon;
}
