import { Options } from "./types";

export default function getDefaultOptions(options: Options) {
    const defaultOptions = {
        logger: console,
        loadFiles: [],
    };

    return {
        ...defaultOptions,
        ...options
    };
}
