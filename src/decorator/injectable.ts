import { injectable as originalInjectable } from "inversify";
import { container } from "../core/inversify.config";

export function injectable() {
    return (target: any) => {
        const isBound = container.isBound(target.name);
        if (isBound) {
            throw new Error(`match more found for serviceIdentifier: ${target.name}`);
        }

        container.bind(target.name).to(target);

        originalInjectable()(target);
    };
}