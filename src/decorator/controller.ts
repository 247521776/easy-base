import { CONTROLLER_METADATA } from "../core/constants";
import { container } from "../core/inversify.config";

export function controller() {
    return (target) => {
        container.bind(CONTROLLER_METADATA).to(target);
    };
}