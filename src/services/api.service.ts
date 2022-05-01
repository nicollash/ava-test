import { QueryKey } from "react-query";
import { IToken } from "types/IToken";

export interface IQueryKeyProps {
  queryKey: QueryKey;
}
const API = {
  fetchTokens: async ({ queryKey }: IQueryKeyProps) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${queryKey[2]}&page=${queryKey[1]}&sparkline=true`
      );
      const data = await response.json();
      return data as Promise<IToken[]>;
    } catch (err) {
      console.log("fetch api error: ", err);
      return null;
    }
  },
};

export default API;
