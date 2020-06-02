import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {
    all,
    del,
    get,
    head,
    injectable,
    options,
    patch,
    post,
    put,
} from "../../src";
import { PATH_METADATA } from "../../src/core/constants";

chai.use(chaiAsPromised);

describe("Http method Test", () => {
    it("get test", () => {
        @injectable()
        class Get {
            @get("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Get);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "get",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("post test", () => {
        @injectable()
        class Post {
            @post("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Post);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "post",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("put test", () => {
        @injectable()
        class Put {
            @put("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Put);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "put",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("all test", () => {
        @injectable()
        class All {
            @all("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, All);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "all",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("patch test", () => {
        @injectable()
        class Patch {
            @patch("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Patch);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "patch",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("del test", () => {
        @injectable()
        class Del {
            @del("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Del);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "del",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("options test", () => {
        @injectable()
        class Options {
            @options("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Options);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "options",
            path: "/test",
            propKey: "getMethod",
        });
    });

    it("head test", () => {
        @injectable()
        class Head {
            @head("/test")
            public getMethod() {}
        }

        const routers = Reflect.getMetadata(PATH_METADATA, Head);

        expect(routers).to.be.length(1);
        expect(routers[0]).to.deep.equal({
            method: "head",
            path: "/test",
            propKey: "getMethod",
        });
    });
});
