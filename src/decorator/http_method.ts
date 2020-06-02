import { PATH_METADATA } from "../core/constants";

/**
 * 生成请求方法
 * @param {string} method http method: post get...
 * 
 * @returns {Decorator}
 */
function createHttpMethod(method: string) {
    return function httpMethodDecorator(path: string) {
        return (target, propKey) => {
            const { constructor } = target;
            // 获取该类上修饰过的路由信息
            const routers = Reflect.getMetadata(PATH_METADATA, constructor) || [];

            routers.push({
                method,
                path,
                propKey
            });

            // 保存路由信息
            Reflect.defineMetadata(PATH_METADATA, routers, constructor);
        };
    };
}

export const post = createHttpMethod('post');

export const get = createHttpMethod('get');

export const all = createHttpMethod('all');

export const put = createHttpMethod('put');

export const patch = createHttpMethod('patch');

export const del = createHttpMethod('del');

export const options = createHttpMethod('options');

export const head = createHttpMethod('head');