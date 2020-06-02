import * as koaBody from 'koa-body';
import * as OriginalRouter from 'koa-router';
import { CONTROLLER_METADATA, DISCARD_CLASS_METADATA, DISCARD_PATH_METADATA, MIDDLEWARE_CLASS_METADATA, MIDDLEWARE_METADATA, PATH_METADATA } from "./constants";
import { container } from "./inversify.config";
import { Constructor } from './types';

export class Router {
    public init () {
        const router = new OriginalRouter();
        const controllers = container.getAll<Constructor>(CONTROLLER_METADATA);
        router.use(koaBody());

        for (const controller of controllers) {
            const isDiscardController: boolean = Reflect.getMetadata(DISCARD_CLASS_METADATA, controller);
            if (isDiscardController) {
                continue;
            }

            const classMiddleware: Function[] = Reflect.getMetadata(MIDDLEWARE_CLASS_METADATA, controller) || [];
            const routers = Reflect.getMetadata(PATH_METADATA, controller) || [];

            for (const routerInfo of routers) {
                const { method, path, propKey } = routerInfo;

                const isDiscardRouter: boolean = Reflect.getMetadata(DISCARD_PATH_METADATA, controller, propKey);
                if (isDiscardRouter) {
                    continue;
                }

                const routerMiddleware: Function[] = Reflect.getMetadata(MIDDLEWARE_METADATA, controller, propKey) || [];

                router[method](path, ...classMiddleware, ...routerMiddleware, async (ctx, next) => {
                    const instance = container.get(controller.name);

                    await instance[propKey](ctx, next);
                });
            }
        }

        return router;
    }
}
