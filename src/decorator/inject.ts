import { inject as originalInject } from "inversify";
import getDecorators from 'inversify-inject-decorators';
import { container } from "../core/inversify.config";

const { lazyInject: originalLazyInject } = getDecorators(container);

export function inject() {
    return (target: any, propKey: string, index?: number) => {
        const type = Reflect.getMetadata('design:type', target, propKey);

        originalInject(type.name)(target, propKey, index);
    };
}

export function lazyInject() {
    return (target: any, propKey: string) => {
        const type = Reflect.getMetadata('design:type', target, propKey);

        originalLazyInject(type.name)(target, propKey);
    };
}