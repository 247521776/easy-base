import { DISCARD_CLASS_METADATA, DISCARD_PATH_METADATA } from "../core/constants";

export function disable() {
    return (...args) => {
        if (args.length === 1) {
            const [target] = args;

            Reflect.defineMetadata(DISCARD_CLASS_METADATA, true, target);
        }
        else if (args.length === 3 && typeof args[2] !== "number") {
            const [target, propKey] = args;
            const { constructor } = target;

            Reflect.defineMetadata(DISCARD_PATH_METADATA, true, constructor, propKey);

        }
        else {
            throw new Error('Disable decorator Can only be used for classes or methods decoration');
        }
    };
}
