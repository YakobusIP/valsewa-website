"use client";

import { useEffect, useState } from "react";

import { priceTierService } from "@/services/pricetier.service";

import { TierPriceItem } from "@/types/pricetier.type";

let cache: Promise<Record<string, TierPriceItem>> | null = null;

function loadCompTierPrices(): Promise<Record<string, TierPriceItem>> {
  if (!cache) {
    cache = priceTierService.fetchPublicPrices().then((data) => {
      const map: Record<string, TierPriceItem> = {};
      if (!data?.compTiers) return map;
      for (const tier of data.compTiers) {
        map[tier.id] = tier;
      }
      return map;
    });
  }
  return cache;
}

export function useCompTierPrices() {
  const [tierPrices, setTierPrices] = useState<Record<string, TierPriceItem>>(
    {}
  );

  useEffect(() => {
    loadCompTierPrices().then(setTierPrices);
  }, []);

  return tierPrices;
}
