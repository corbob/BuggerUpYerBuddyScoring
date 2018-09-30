define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function error(message) {
        window.alert(message);
        throw (message);
    }
    exports.error = error;
});
