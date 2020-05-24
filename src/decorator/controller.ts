import { CONTROLLER_CLASS } from "../core/constants";
import { container } from "../core/inversify.config";

export function controller() {
    return (target) => {
        container.bind(CONTROLLER_CLASS).to(target);
    };
}