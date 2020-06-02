import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { middleware } from "../../src";
import { MIDDLEWARE_CLASS_METADATA, MIDDLEWARE_METADATA } from "../../src/core/constants";

chai.use(chaiAsPromised);

describe("Middleware Test", () => {
    it("Middleware for property test", () => {
        function middlewareFunc() {}

        class Middleware {
            @middleware(middlewareFunc)
            public test() {}

            @middleware([middlewareFunc])
            public get() {}
        }

        const testMiddleware = Reflect.getMetadata(MIDDLEWARE_METADATA, Middleware, 'test');

        expect(testMiddleware).to.be.length(1);
        expect(testMiddleware[0]).to.be.eq(middlewareFunc);

        const getMiddleware = Reflect.getMetadata(MIDDLEWARE_METADATA, Middleware, 'get');

        expect(getMiddleware).to.be.length(1);
        expect(getMiddleware[0]).to.be.eq(middlewareFunc);
    });

    it("Middleware for class test", () => {
        function middlewareFunc() {}

        @middleware(middlewareFunc)
        class MiddlewareClass {
            public test() {}
        }

        const middlewares = Reflect.getMetadata(MIDDLEWARE_CLASS_METADATA, MiddlewareClass);

        expect(middlewares).to.be.length(1);
        expect(middlewares[0]).to.be.eq(middlewareFunc);

        @middleware([middlewareFunc])
        class MiddlewareClassArray {
            public test() {}
        }

        const middlewareArray = Reflect.getMetadata(MIDDLEWARE_CLASS_METADATA, MiddlewareClassArray);

        expect(middlewareArray).to.be.length(1);
        expect(middlewareArray[0]).to.be.eq(middlewareFunc);
    });

    it("Middleware throw error test", () => {
        function middlewareFunc() {}

        expect(() => {
            class MiddlewareClass {
                public constructor(@middleware(middlewareFunc) a) {}
            }
        }).to.be.Throw("Middleware Can only be used for classes or methods decoration");
    });
});