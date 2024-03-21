const url = import.meta.env.VITE_APP_RAPID_API_URL;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
  },
};

export const getCitites = async ({
  searchTerm,
  limit = 5,
  offset = 0,
}: {
  searchTerm?: string;
  limit?: number;
  offset?: number;
} = {}) => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("namePrefix", searchTerm);
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());
    params.append("countryIds", "IN");

    const urlWithParams = new URL(url);
    urlWithParams.search = params.toString();

    const response = await fetch(urlWithParams.toString(), options);
    const result = (await response.json()) as {
      data: { id: number; name: string; country: string }[];
      metadata: { totalCount: number; currentOffset: number };
    };
    const transformedResponse = result?.data?.map(({ id, name, country }) => ({
      id,
      name,
      country,
    }));
    return {
      data: transformedResponse,
      total: result.metadata.totalCount,
      offset: result.metadata.currentOffset,
    };
  } catch (error) {
    console.error(error);
  }
};
