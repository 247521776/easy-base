import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { container, injectable, inject, lazyInject } from "../../src";

chai.use(chaiAsPromised);

describe("Inject Test", () => {
    it("Inject test", () => {

        @injectable()
        class Entity {}

        @injectable()
        class Inject {
            @inject()
            public test: Entity;
        }

        const instance = container.get<Inject>(Inject.name);

        expect(instance.test).to.be.an.instanceof(Entity);
    });

    it("Lazy inject test", () => {

        @injectable()
        class Entity1 {}

        @injectable()
        class LazyInject {
            @lazyInject()
            public test: Entity1;
        }

        const instance = container.get<LazyInject>(LazyInject.name);

        expect(instance.test).to.be.an.instanceof(Entity1);
    });
});