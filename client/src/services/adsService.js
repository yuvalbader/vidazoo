import axios from "axios";

export const getAds = async (domain) => {
  try {
    const result = await axios.get(
      `http://localhost:3001/api?domain=${domain}`
    );

    if (result.status !== 200) {
      throw new Error(`Failed to fetch data: ${result.status}`);
    }

    return result.data;
  } catch (error) {
    throw new Error(
      `Error while fetching data: ${error.message}. Please try again.`
    );
  }
};
