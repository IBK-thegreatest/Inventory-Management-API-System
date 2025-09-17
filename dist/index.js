"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const cors_1 = tslib_1.__importDefault(require("cors"));
// dotenv.config();
// mongoose.connect(
//     process.env.MONGO_URL
// ).then(() => {
//     console.log("Database Connection Successful")
// }).catch(err => {
//     console.log(err)
// })
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(compression_1.default);
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is currently running on port ${port}`);
});
//# sourceMappingURL=index.js.map