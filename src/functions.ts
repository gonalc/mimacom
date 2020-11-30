// Helper functions to make easier the requests to the server.

/**
 * GET Helper for fetching products from the database.
 * @param url {string} URL for making the request.
 */
export const get = async (url: string) => {
    const response = await fetch(url, {});
    const responseData = await response.json();
    return responseData;
};

/**
 * PATCH Helper for updating the database.
 * @param url {string} URL for making the request.
 * @param data {Object} Fields with updating values.
 */
export const patch = async (url: string, data: {}) => {
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    const responseData = await response.json();
    return responseData;
};

