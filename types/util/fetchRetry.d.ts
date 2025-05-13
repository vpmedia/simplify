export const HTTP_0_ANY: 0;
export class FetchError extends Error {
    /**
     * Creates a new FetchError instance.
     * @param {string} message - Error message.
     * @param {string | URL | Request} resource - Fetch URL.
     * @param {RequestInit} fetchOptions - Fetch options.
     * @param {Response} response - Fetch response.
     */
    constructor(message: string, resource: string | URL | Request, fetchOptions: RequestInit, response: Response);
    resource: string | URL | Request;
    fetchOptions: RequestInit;
    response: Response;
}
export function fetchRetry(resource: string | URL | Request, fetchOptions?: RequestInit, retryOptions?: {
    delay?: number;
    numTries?: number;
    statusExcludes?: number[];
    timeout?: number;
}): Promise<Response>;
//# sourceMappingURL=fetchRetry.d.ts.map