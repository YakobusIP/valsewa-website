"use client";

import { forwardRef, memo } from "react";

import InventoryAccountCard from "@/components/InventoryAccountCard";

import { AccountEntity } from "@/types/account.type";

import { SortDropdown, SortOption } from "./SortDropdown";

interface AccountsSectionProps {
  accounts: AccountEntity[];
  isLoading: boolean;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
}

const AccountsSectionInner = forwardRef<HTMLElement, AccountsSectionProps>(
  function AccountsSection(
    { accounts, isLoading, sortOption, onSortChange, onResetFilters },
    ref
  ) {
    return (
      <section ref={ref} className="bg-black px-4 md:px-8 lg:px-8 pt-10 pb-16">
        {/* Desktop / tablet header */}
        <div className="hidden md:flex items-end justify-between mb-8">
          <div>
            <h2 className="font-antonio text-white tracking-wide uppercase text-5xl lg:text-6xl font-normal">
              Full Inventory
            </h2>
            <p className="font-instrumentSans text-white/60 text-base mt-1">
              Explore 100+ Premium Accounts today!
            </p>
          </div>
          <SortDropdown currentSort={sortOption} onChange={onSortChange} />
        </div>

        {/* Mobile header */}
        <div className="md:hidden text-center mb-6">
          <h2 className="font-antonio text-white tracking-wide uppercase text-4xl font-normal">
            Full Inventory
          </h2>
          <p className="font-instrumentSans text-white/60 text-sm mt-1">
            Explore 100+ Premium Accounts today!
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm bg-neutral-800/50 animate-pulse aspect-[3/4]"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && accounts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="font-antonio font-bold text-white"
              style={{ fontSize: "50px" }}
            >
              0 Accounts matched.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 font-instrumentSans text-white/50 hover:text-white transition text-base"
            >
              Check our most popular accounts →
            </button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && accounts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 tablet:gap-4 gap-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() =>
                  window.open(
                    `/accounts/${account.accountCode}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="cursor-pointer"
              >
                <InventoryAccountCard
                  item={account}
                  linkClassName="pointer-events-none"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
);

const AccountsSection = memo(AccountsSectionInner);
export default AccountsSection;
