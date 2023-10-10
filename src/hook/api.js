import axios from "axios";

export default function useApi() {
    async function get(path) {

        if (!!!path) return null

        try {
            const { data, status } = await axios
                .get(path, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .catch((e) => {
                    throw new Error(e.response.data.message);
                });
            if (status === 200) {
                return data;
            }else{
                throw new Error("Problem receiving data")
            }
        } catch (error) {
            console.warn("There was an error in getting the API values \n please check your internet connection")
        }
    }


    return { get };
}