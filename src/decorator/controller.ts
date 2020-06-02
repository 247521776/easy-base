import { CONTROLLER_METADATA } from "../core/constants";
import { container } from "../core/inversify.config";
import { Constructor } from "../core/types";

export function controller() {
    return (target) => {
        container.bind<Constructor>(CONTROLLER_METADATA).toConstructor(target);
    };
}
