import { useEffect, useRef, useState } from "react";

import {
  fetchAccountByRank,
  fetchAccountByTier,
  fetchAccounts
} from "@/services/accountService";

import { AccountEntity, TierFilter } from "@/types/account.type";

import { useDebounce } from "use-debounce";

export function useAccountController(initialAccount: AccountEntity[]) {
  const [accountList, setAccountList] = useState(initialAccount);
  const [searchAccount, setSearchAccount] = useState("");
  const [sortAccount, setSortAccount] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [debouncedSearch] = useDebounce(searchAccount, 1000);

  const [tierFilter, setTierFilter] = useState<TierFilter>(null);
  const [rankFilter, setRankFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        if (tierFilter) {
          const res = await fetchAccountByTier(
            tierFilter.id,
            tierFilter.isLowTier
          );
          setAccountList(res ?? []);
          return;
        } else if (rankFilter != "") {
          const res = await fetchAccountByRank(rankFilter);
          setAccountList(res ?? []);
          return;
        }

        const res = await fetchAccounts(
          debouncedSearch,
          sortDirection,
          sortAccount
        );
        setAccountList(res ?? []);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [debouncedSearch, sortDirection, sortAccount, tierFilter, rankFilter]);

  const changeDirection = (key: string) => {
    if (sortAccount === key) {
      // If the user clicks the same option again, toggle the sort direction
      setSortDirection((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
    } else {
      // If the user selects a different option, reset the direction to "asc"
      setSortAccount(key);
      setSortDirection("asc");
    }
  };

  const getSortLabel = () => {
    switch (sortAccount) {
      case "rank":
        return "Rank";
      case "price_tier":
        return "Price Tier";
      case "availability":
        return "Availability";
      default:
        return "Sort By";
    }
  };

  const selectTier = async (id: string, isLowTier: string) => {
    setTierFilter({ id, isLowTier });
  };

  const selectRank = async (rank: string) => {
    setRankFilter(rank);
  };

  const clearTier = () => setTierFilter(null);
  const clearRank = () => setRankFilter("");

  return {
    accountList,
    searchAccount,
    setSearchAccount,
    sortAccount,
    sortDirection,
    changeDirection,
    getSortLabel,

    loading,
    selectTier,
    selectRank,
    clearRank,
    clearTier,
    tierFilter,
    rankFilter
  };
}
