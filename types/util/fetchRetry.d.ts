export class FetchError extends Error {
    /**
     * Creates a new FetchError instance.
     * @param {string} message - Error message.
     * @param {Response} response - Fetch response object.
     */
    constructor(message: string, response: Response);
    response: Response;
}
export function fetchRetry(resource: string | URL | Request, fetchOptions?: RequestInit, retryOptions?: {
    delay?: number;
    numTries?: number;
    statusExcludes?: number[];
}): Promise<Response>;
//# sourceMappingURL=fetchRetry.d.ts.map