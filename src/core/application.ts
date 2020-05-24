import Koa = require("koa");
import path = require("path");
import readdirp = require("readdirp");
import { Router } from "./router";
import { Options } from "./types";

const JsTsReg = /\.[j|t]s$/;

export class Application {
    public app: Koa;
    private _options: Options;

    public constructor(options: Options) {
        this._options = options;
        this.app = new Koa();
    }

    public async init() {
        await this._initFile();
        this._initRouters();
    }

    public async loadFile(filePath: string) {
        const files = await readdirp.promise(path.resolve(this._options.rootPath, filePath), { fileFilter: ["*,js", "*.ts"] });
        files
            .map(file => file.fullPath.replace(JsTsReg, ""))
            .forEach(file => require(file));
    }

    public listen(port: number) {
        const server = this.app.listen(port);
        return server;
    }

    private async _initFile() {
        const { loadFiles } = this._options;

        for (const filePath of loadFiles) {
            await this.loadFile(filePath);
        }
    }

    private _initRouters() {
        const router = new Router().init();

        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
    }
}