import CatalogueClient from "./catalogue-client";

import { fetchAccountsPublic } from "@/services/accountService";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catalogue | Valsewa",
  description: "Browse our full inventory of premium Valorant accounts.",
};

export default async function CataloguePage() {
  const initialAccounts =
    (await fetchAccountsPublic({ limit: 50, sortBy: "id", direction: "desc" })) ?? [];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <CatalogueClient initialAccounts={initialAccounts} />
    </div>
  );
}
