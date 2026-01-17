import { AccountEntity, AccountsPublicParams } from "@/types/account.type";

import axios from "axios";

export async function fetchAccounts(
  search: string,
  direction: string,
  sortBy: string
) {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_AXIOS_BASE_URL
    }/api/accounts/public?page=1&limit=1000&q=${encodeURIComponent(
      search
    )}&sortBy=${encodeURIComponent(sortBy)}&direction=${encodeURIComponent(
      direction
    )}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function fetchCarousel() {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/carousels`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function fetchAccountById(
  id: string
): Promise<AccountEntity | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/accounts/public/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch {
    return null;
  }
}

export async function fetchRecommendedAccounts(): Promise<AccountEntity[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/accounts/public/recommended`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching recommended accounts:", error);
    return [];
  }
}

export async function fetchAccountByTier(
  id: string,
  isLowTier: string
): Promise<AccountEntity[] | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/accounts/public?page=1&limit=1000&tiers=${id}&low_tier_only=${isLowTier}`;
    const response = await axios.get(url);
    console.log("Fetch Account By Tier", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchAccountByRank(
  rank: string
): Promise<AccountEntity[] | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/accounts/public?page=1&limit=1000&ranks=${rank}`;
    const response = await axios.get(url);
    console.log("Fetch Account By Rank", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function buildAccountsPublicQuery(params: AccountsPublicParams) {
  const sp = new URLSearchParams();

  // primitives
  if (params.page != null) sp.set("page", String(params.page));
  if (params.limit != null) sp.set("limit", String(params.limit));
  if (params.q) sp.set("q", params.q);

  if (params.min_price != null) sp.set("min_price", String(params.min_price));
  if (params.max_price != null) sp.set("max_price", String(params.max_price));

  if (params.sortBy) sp.set("sortBy", params.sortBy);
  if (params.direction) sp.set("direction", params.direction);

  // boolean: if you want "all" to omit this param, just pass undefined from UI
  if (typeof params.low_tier_only === "boolean") {
    sp.set("low_tier_only", String(params.low_tier_only));
  }

  // arrays as repeated keys: tiers=B&tiers=C ...
  params.tiers?.forEach((t) => sp.append("tiers", t));
  params.skin_counts?.forEach((s) => sp.append("skin_counts", s));
  params.ranks?.forEach((r) => sp.append("ranks", r));

  return sp;
}

export async function fetchAccountsPublic(
  params: AccountsPublicParams
): Promise<AccountEntity[] | null> {
  try {
    const base = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;
    const sp = buildAccountsPublicQuery(params);

    const url = `${base}/api/accounts/public?${sp.toString()}`;
    const res = await axios.get(url);

    const payload = res.data;

    return payload.data;
  } catch (err) {
    console.error("fetchAccountsPublic error:", err);
    return null;
  }
}
