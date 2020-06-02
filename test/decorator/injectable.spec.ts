import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { container, injectable } from "../../src";

chai.use(chaiAsPromised);

describe("Injectable Test", () => {
    it("Injectable test", () => {

        @injectable()
        class Injectable {}

        const instance = container.get(Injectable.name);

        expect(instance).to.be.an.instanceof(Injectable);
    });

    it("Injectable throw error test", () => {

        expect(() => {
            @injectable()
            class Injectable {}
        }).to.be.Throw("match more found for serviceIdentifier: Injectable");
    });
});