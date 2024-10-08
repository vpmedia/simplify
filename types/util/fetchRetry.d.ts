export const HTTP_0_ANY: 0;
export class FetchError extends Error {
    /**
     * Creates a new FetchError instance.
     * @param {string} message - Error message.
     * @param {RequestInit} request - Fetch request object.
     * @param {Response} response - Fetch response object.
     */
    constructor(message: string, request: RequestInit, response: Response);
    request: RequestInit;
    response: Response;
}
export function fetchRetry(resource: string | URL | Request, fetchOptions?: RequestInit, retryOptions?: {
    delay?: number;
    numTries?: number;
    statusExcludes?: number[];
}): Promise<Response>;
//# sourceMappingURL=fetchRetry.d.ts.map