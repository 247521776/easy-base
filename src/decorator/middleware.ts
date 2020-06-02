import { MIDDLEWARE_CLASS_METADATA, MIDDLEWARE_METADATA } from "../core/constants";

export function middleware(functions: Function[] | Function) {
    return (...args) => {
        if (args.length === 1) {
            const [target] = args;

            const middleware = Reflect.getMetadata(MIDDLEWARE_CLASS_METADATA, target) || [];

            if (Array.isArray(functions)) {
                middleware.push(...functions);
            }
            else {
                middleware.push(functions);
            }

            Reflect.defineMetadata(MIDDLEWARE_CLASS_METADATA, middleware, target);
        }
        else if (args.length === 3 && typeof args[2] !== "number") {
            const [target, propKey] = args;
            const { constructor } = target;

            const middleware = Reflect.getMetadata(MIDDLEWARE_METADATA, constructor, propKey) || [];

            if (Array.isArray(functions)) {
                middleware.push(...functions);
            }
            else {
                middleware.push(functions);
            }

            Reflect.defineMetadata(MIDDLEWARE_METADATA, middleware, constructor, propKey);
        }
        else {
            throw new Error('Middleware Can only be used for classes or methods decoration');
        }

    };
}
