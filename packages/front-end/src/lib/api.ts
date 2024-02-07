import { IPal } from "@/common/interfaces";
import { unstable_cache as cache } from "next/cache";

export type ApiProps = {
  page: number;
  limit: number;
  name?: string;
  types?: string;
  suitability?: string;
  drops?: string;
  key?: string;
  term?: string;
};
export type ApiResponse = {
  content: IPal[];
  page: number;
  limit: number;
  count: number;
  total: number;
};
export const getPals = cache(
  async (
    {
      page = 1,
      limit = 10,
      name,
      types,
      suitability,
      drops,
      key,
      term,
    }: ApiProps = {
      page: 1,
      limit: 10,
    }
  ) => {
    const url = new URL(`${process.env.API_URL}`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());
    if (name) url.searchParams.append("name", name);
    if (types) url.searchParams.append("types", types);
    if (suitability) url.searchParams.append("suitability", suitability);
    if (drops) url.searchParams.append("drops", drops);
    if (key) url.searchParams.append("key", key);
    if (term) url.searchParams.append("term", term);

    console.log(`fetching ${url}`);

    return (await fetch(`${url}`, {
      method: "GET",
    }).then((res) => res.json())) as ApiResponse;
  },
  ["pals"],
  {
    tags: ["pals"],
  }
);
