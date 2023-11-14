import axios from "axios";

export const getAds = async (domain) => {
  try {
    // Record the start time
    const startTime = performance.now();

    const result = await axios.get(
      `http://localhost:3001/api?domain=${domain}`
    );

    // Record the end time
    const endTime = performance.now();

    if (result.status !== 200) {
      throw new Error(`Failed to fetch data: ${result.status}`);
    }

    // Calculate the elapsed time
    const elapsedTime = endTime - startTime;

    return result.data;
  } catch (error) {
    throw new Error(
      `Error while fetching data: ${error.message}. Please try again.`
    );
  }
};
