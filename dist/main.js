"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    let port = Number(process.env.PORT) || 3000;
    while (true) {
        try {
            await app.listen(port);
            console.log(`Nest app running at http://localhost:${port}`);
            break;
        }
        catch (error) {
            const err = error;
            if (err.code !== "EADDRINUSE") {
                throw err;
            }
            console.log(`Port ${port} is in use, trying ${port + 1}...`);
            port += 1;
        }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map