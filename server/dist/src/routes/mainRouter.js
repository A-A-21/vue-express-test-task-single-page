"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mainController_1 = require("../controllers/mainController");
var router = (0, express_1.Router)();
router.get('/', mainController_1.mainController.main);
exports.default = router;
//# sourceMappingURL=mainRouter.js.map