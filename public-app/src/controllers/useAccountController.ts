import { useEffect, useRef, useState } from "react";

import { fetchAccounts } from "@/services/accountService";

import { AccountEntity } from "@/types/account.type";

import { useDebounce } from "use-debounce";

export function useAccountController(initialAccount: AccountEntity[]) {
  const [accountList, setAccountList] = useState(initialAccount);
  const [searchAccount, setSearchAccount] = useState("");
  const [sortAccount, setSortAccount] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [debouncedSearch] = useDebounce(searchAccount, 1000);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchAccounts(debouncedSearch, sortDirection, sortAccount).then((res) =>
      setAccountList(res)
    );
  }, [debouncedSearch, sortDirection, sortAccount]);

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
  return {
    accountList,
    searchAccount,
    setSearchAccount,
    sortAccount,
    sortDirection,
    changeDirection,
    getSortLabel
  };
}
