"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomValidator = /** @class */ (function () {
    function CustomValidator() {
    }
    // Number only validation
    CustomValidator.numeric = function (control) {
        var val = control.value;
        if (val === null || val === '')
            return null;
        if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/))
            return { 'invalidNumber': true };
        return null;
    };
    return CustomValidator;
}());
exports.CustomValidator = CustomValidator;
//# sourceMappingURL=CustomValidator.js.map