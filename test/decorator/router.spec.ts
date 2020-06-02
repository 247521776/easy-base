import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { disable } from "../../src";

chai.use(chaiAsPromised);

describe("Router Test", () => {
    it("Router throw error test", () => {
        expect(() => {
            class MiddlewareClass {
                public constructor(@disable() a) {}
            }
        }).to.be.Throw("Disable decorator Can only be used for classes or methods decoration");
    });
});
