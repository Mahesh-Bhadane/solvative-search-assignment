const url = import.meta.env.VITE_APP_RAPID_API_URL;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
  },
};
console.log("env", import.meta.env.VITE_APP_RAPID_API_KEY);

export const getCitites = async ({
  searchTerm,
  limit,
}: {
  searchTerm?: string;
  limit?: number;
} = {}) => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("namePrefix", searchTerm);
    if (limit) params.append("limit", limit.toString());
    params.append("countryIds", "IN");

    const urlWithParams = new URL(url);
    urlWithParams.search = params.toString();

    const response = await fetch(urlWithParams.toString(), options);
    const result = (await response.json()) as {
      data: {
        id: number;
        name: string;
        country: string;
      }[];
    };
    const transformedResponse = result?.data?.map(({ id, name, country }) => ({
      id,
      name,
      country,
    }));
    return transformedResponse;
  } catch (error) {
    console.error(error);
  }
};
