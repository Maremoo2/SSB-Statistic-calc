// dataFetcher.ts
import axios from "axios";

export async function fetchData(
  statisticVariable: string,
  regionType: string,
  regions: string[],
  years: string[]
): Promise<any> {
  try {
    const url = "https://data.ssb.no/api/v0/no/table/11342";

    // Opprett spørring basert på brukerens input
    const query = {
      query: [
        {
          code: "Region",
          selection: {
            filter: "item",
            values: regions,
          },
        },
        {
          code: "ContentsCode",
          selection: {
            filter: "item",
            values: ["Folkemengde"],
          },
        },
        {
          code: "Tid",
          selection: {
            filter: "item",
            values: years,
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    };

    // Definer konfigurasjon for axios-forespørsel
    const axiosConfig = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: query,
    };

    // Hent data fra SSB-API-et
    const response = await axios.get(url, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
