const fetchWithRetry = async (fetchFunction, retries = 8, delay = 1500) => {
    try {
        return await fetchFunction();
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying to fetch posts... attempts left: ${retries}`);

            await new Promise(resolve => setTimeout(resolve, delay));

            return fetchWithRetry(fetchFunction, retries - 1, delay * 1.5); 
        };

        throw error;
    };
};

export default fetchWithRetry;