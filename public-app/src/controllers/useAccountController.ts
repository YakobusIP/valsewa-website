import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { fetchAccounts } from "@/services/accountService";

export function useAccountController() {
  const [accountList, setAccountList] = useState([]);
  const [searchAccount, setSearchAccount] = useState("");
  const [sortAccount, setSortAccount] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [debouncedSearch] = useDebounce(searchAccount, 1000);

  useEffect(() => {
    fetchAccounts(debouncedSearch, sortDirection, sortAccount).then(
      setAccountList
    );
  }, [debouncedSearch, sortDirection, sortAccount]);

  useEffect(() => {
    fetchAccounts("", sortDirection, sortAccount).then(setAccountList);
  }, [sortDirection, sortAccount]);

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
    getSortLabel,
  };
}
