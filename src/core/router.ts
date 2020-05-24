import OriginalRouter = require('koa-router');
import { CONTROLLER_METADATA, DISCARD_CLASS_METADATA, DISCARD_PATH_METADATA, MIDDLEWARE_CLASS_METADATA, MIDDLEWARE_METADATA, PATH_METADATA } from "./constants";
import { container } from "./inversify.config";

export class Router {
    public init () {
        const router = new OriginalRouter();
        const controllers = container.getAll(CONTROLLER_METADATA);

        for (const controller of controllers) {
            const isDiscardController: boolean = Reflect.getMetadata(DISCARD_CLASS_METADATA, controller);
            if (isDiscardController) {
                continue;
            }

            const classMiddleware: Function[] = Reflect.getMetadata(MIDDLEWARE_CLASS_METADATA, controller);
            const routers = Reflect.getMetadata(PATH_METADATA, controller) || [];

            for (const router of routers) {
                const { method, path, propKey } = router;

                const isDiscardRouter: boolean = Reflect.getMetadata(DISCARD_PATH_METADATA, controller, propKey);
                if (isDiscardRouter) {
                    continue;
                }

                const routerMiddleware: Function[] = Reflect.getMetadata(MIDDLEWARE_METADATA, controller, propKey) || [];

                Router[method](path, ...classMiddleware, ...routerMiddleware, controller[propKey]);
            }
        }

        return router;
    }
}