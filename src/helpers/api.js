import axios, { AxiosError } from "axios";

export const fetchAPI = async (method, url, body, headers) => {
    try {
        switch (method.toUpperCase()) {
            case "GET":
                const getResponse =  await axios.get(url, {
                    headers: { ...headers },
                });
                return getResponse;
            case "POST":
                const postResponse = await axios.post(url, body, {
                    headers: { ...headers },
                });
                return postResponse;
            case "PUT":
                const putResponse = await axios.put(url, body, {
                    headers: { ...headers },
                });
                return putResponse;
            case "DELETE":
                const deleteResponse =  await axios.delete(url, {
                    headers: { ...headers },
                });
                return deleteResponse;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Error:", error.message);
        }
        throw error;
    }
};
