import { useEffect, useState } from "react";

import { accountService } from "@/services/account.service";
import { dailyDropService } from "@/services/dailydrop.service";
import { priceTierService } from "@/services/pricetier.service";

import { MultiSelect } from "@/components/ui/multi-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "@/hooks/useToast";

import {
  DailyDropConfigEntity,
  DailyDropSlotEntity,
  UpsertDailyDropConfigPayload
} from "@/types/dailydrop.type";
import { PriceTier } from "@/types/pricetier.type";
import { SORT_ORDER } from "@/lib/enums";

import { Loader2Icon, RefreshCwIcon, ZapIcon } from "lucide-react";

// UI state stores duration *strings* ("3h", "1d 2h") for the duration picker.
// IDs are only resolved at load/save time.
type SlotConfig = {
  priceTierIds: string[];
  durationValues: string[];
};

const EMPTY_SLOT: SlotConfig = { priceTierIds: [], durationValues: [] };

function buildDurationOptions(
  priceTiers: PriceTier[],
  tierIds: string[]
): { label: string; value: string }[] {
  const source =
    tierIds.length > 0
      ? priceTiers.filter((t) => tierIds.includes(String(t.id)))
      : priceTiers;
  const seen = new Set<string>();
  const options: { label: string; value: string }[] = [];
  for (const tier of source) {
    for (const pl of tier.priceList) {
      if (!seen.has(pl.duration)) {
        seen.add(pl.duration);
        options.push({ label: pl.duration, value: pl.duration });
      }
    }
  }
  return options;
}

function idsTodurations(
  priceTiers: PriceTier[],
  priceListIds: number[],
  tierIds: number[]
): string[] {
  if (priceListIds.length === 0) return [];
  const source =
    tierIds.length > 0
      ? priceTiers.filter((t) => tierIds.includes(t.id))
      : priceTiers;
  const durations = new Set<string>();
  source
    .flatMap((t) => t.priceList)
    .filter((pl) => pl.id !== undefined && priceListIds.includes(pl.id!))
    .forEach((pl) => durations.add(pl.duration));
  return Array.from(durations);
}

// Convert selected duration strings to priceList IDs for saving.
// If tierIds given: only IDs within those tiers.
// If no tierIds: IDs from ALL tiers that have those durations.
function durationsToIds(
  priceTiers: PriceTier[],
  durationValues: string[],
  tierIds: number[]
): number[] {
  if (durationValues.length === 0) return [];
  const source =
    tierIds.length > 0
      ? priceTiers.filter((t) => tierIds.includes(t.id))
      : priceTiers;
  const ids = new Set<number>();
  source
    .flatMap((t) => t.priceList)
    .filter((pl) => pl.id !== undefined && durationValues.includes(pl.duration))
    .forEach((pl) => ids.add(pl.id!));
  return Array.from(ids);
}

export default function DailyDropModal({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isLoadingDrops, setIsLoadingDrops] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isTriggeringRandomizer, setIsTriggeringRandomizer] = useState(false);

  const [drops, setDrops] = useState<DailyDropSlotEntity[]>([]);
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([]);
  const [priceTiersLoaded, setPriceTiersLoaded] = useState(false);

  const [discountMin, setDiscountMin] = useState("");
  const [discountMax, setDiscountMax] = useState("");
  const [slots, setSlots] = useState<[SlotConfig, SlotConfig, SlotConfig]>([
    { ...EMPTY_SLOT },
    { ...EMPTY_SLOT },
    { ...EMPTY_SLOT }
  ]);
  const [allowedAccountIds, setAllowedAccountIds] = useState<string[]>([]);
  const [accountOptions, setAccountOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // Pending raw config held until priceTiers finishes loading
  const [pendingConfig, setPendingConfig] =
    useState<DailyDropConfigEntity | null>(null);

  // Once priceTiers are available, resolve any pending config into form state
  useEffect(() => {
    if (!priceTiersLoaded || !pendingConfig) return;
    applyConfigWithTiers(pendingConfig, priceTiers);
    setPendingConfig(null);
  }, [priceTiersLoaded, pendingConfig]);

  const applyConfigWithTiers = (
    config: DailyDropConfigEntity,
    tiers: PriceTier[]
  ) => {
    setDiscountMin(String(config.discountMin));
    setDiscountMax(String(config.discountMax));
    setAllowedAccountIds(config.allowedAccountIds.map(String));
    setSlots([
      {
        priceTierIds: config.slot1PriceTierIds.map(String),
        durationValues: idsTodurations(
          tiers,
          config.slot1PriceListIds,
          config.slot1PriceTierIds
        )
      },
      {
        priceTierIds: config.slot2PriceTierIds.map(String),
        durationValues: idsTodurations(
          tiers,
          config.slot2PriceListIds,
          config.slot2PriceTierIds
        )
      },
      {
        priceTierIds: config.slot3PriceTierIds.map(String),
        durationValues: idsTodurations(
          tiers,
          config.slot3PriceListIds,
          config.slot3PriceTierIds
        )
      }
    ]);
  };

  const fetchDrops = async () => {
    setIsLoadingDrops(true);
    try {
      const res = await dailyDropService.getAdminDrops();
      setDrops(res.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Failed to load today's drop",
          description: error.message
        });
      }
    } finally {
      setIsLoadingDrops(false);
    }
  };

  const fetchConfig = async () => {
    setIsLoadingConfig(true);
    try {
      const res = await dailyDropService.getConfig();
      if (res.data) setPendingConfig(res.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Failed to load config",
          description: error.message
        });
      }
    } finally {
      setIsLoadingConfig(false);
    }
  };

  const fetchPriceTiers = async () => {
    try {
      const res = await priceTierService.fetchAll();
      setPriceTiers(res.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Failed to load price tiers",
          description: error.message
        });
      }
    } finally {
      setPriceTiersLoaded(true);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await accountService.fetchAll(
        1,
        500,
        "",
        "id_tier",
        SORT_ORDER.ASCENDING
      );
      setAccountOptions(
        res.data.map((a) => ({
          label: `${a.accountCode} — ${a.nickname} (${a.accountRank})`,
          value: String(a.id)
        }))
      );
    } catch {
      // non-critical
    }
  };

  useEffect(() => {
    if (!open) return;
    // Reset loading flag so re-opening re-triggers the apply effect
    setPriceTiersLoaded(false);
    setPendingConfig(null);
    setSlots([{ ...EMPTY_SLOT }, { ...EMPTY_SLOT }, { ...EMPTY_SLOT }]);
    fetchDrops();
    fetchPriceTiers();
    fetchAccounts();
    fetchConfig();
  }, [open]);

  const handleSaveConfig = async () => {
    const min = parseFloat(discountMin);
    const max = parseFloat(discountMax);
    if (isNaN(min) || isNaN(max) || min < 0 || max > 100 || min > max) {
      toast({
        variant: "destructive",
        title: "Invalid discount range",
        description: "Min must be ≥ 0, max must be ≤ 100, and min ≤ max."
      });
      return;
    }

    const payload: UpsertDailyDropConfigPayload = {
      discountMin: min,
      discountMax: max,
      slot1PriceTierIds: slots[0].priceTierIds.map(Number),
      slot2PriceTierIds: slots[1].priceTierIds.map(Number),
      slot3PriceTierIds: slots[2].priceTierIds.map(Number),
      slot1PriceListIds: durationsToIds(
        priceTiers,
        slots[0].durationValues,
        slots[0].priceTierIds.map(Number)
      ),
      slot2PriceListIds: durationsToIds(
        priceTiers,
        slots[1].durationValues,
        slots[1].priceTierIds.map(Number)
      ),
      slot3PriceListIds: durationsToIds(
        priceTiers,
        slots[2].durationValues,
        slots[2].priceTierIds.map(Number)
      ),
      allowedAccountIds: allowedAccountIds.map(Number)
    };

    setIsSavingConfig(true);
    try {
      await dailyDropService.upsertConfig(payload);
      toast({ title: "All set!", description: "Daily Drop config saved." });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Failed to save config",
          description: error.message
        });
      }
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleTriggerRandomizer = async () => {
    setIsTriggeringRandomizer(true);
    try {
      await dailyDropService.triggerRandomizer();
      toast({ title: "All set!", description: "Randomizer completed." });
      await fetchDrops();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Randomizer failed",
          description: error.message
        });
      }
    } finally {
      setIsTriggeringRandomizer(false);
    }
  };

  // When price tiers change for a slot, drop any selected durations that are
  // no longer valid for the new tier set.
  const updateSlotTiers = (index: number, newTierIds: string[]) => {
    setSlots((prev) => {
      const next = [...prev] as [SlotConfig, SlotConfig, SlotConfig];
      const available = new Set(
        buildDurationOptions(priceTiers, newTierIds).map((o) => o.value)
      );
      next[index] = {
        priceTierIds: newTierIds,
        durationValues: next[index].durationValues.filter((d) =>
          available.has(d)
        )
      };
      return next;
    });
  };

  const updateSlotDurations = (index: number, newDurations: string[]) => {
    setSlots((prev) => {
      const next = [...prev] as [SlotConfig, SlotConfig, SlotConfig];
      next[index] = { ...next[index], durationValues: newDurations };
      return next;
    });
  };

  const priceTierOptions = priceTiers.map((t) => ({
    label: t.code,
    value: String(t.id)
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl flex flex-col max-h-[90dvh]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ZapIcon size={18} />
            Daily Drop
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="today" className="flex flex-col flex-1 min-h-0">
          <TabsList className="w-full flex-shrink-0">
            <TabsTrigger value="today" className="flex-1">
              Today's Drop
            </TabsTrigger>
            <TabsTrigger value="config" className="flex-1">
              Configuration
            </TabsTrigger>
          </TabsList>

          {/* ── TODAY'S DROP ── */}
          <TabsContent value="today" className="flex-1 overflow-y-auto">
            <div className="flex justify-end mb-3">
              <Button
                size="sm"
                onClick={handleTriggerRandomizer}
                disabled={isTriggeringRandomizer}
              >
                {isTriggeringRandomizer ? (
                  <Loader2Icon className="animate-spin" size={16} />
                ) : (
                  <RefreshCwIcon size={16} />
                )}
                Run Randomizer
              </Button>
            </div>

            {isLoadingDrops ? (
              <div className="flex justify-center py-10">
                <Loader2Icon
                  className="animate-spin text-muted-foreground"
                  size={24}
                />
              </div>
            ) : drops.length === 0 ? (
              <p className="text-center text-muted-foreground py-10 text-sm">
                No drops for today yet. Run the randomizer to generate them.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {drops.map((drop) => (
                  <div
                    key={drop.slot}
                    className="border rounded-lg p-4 flex items-start gap-4"
                  >
                    {drop.account.thumbnail ? (
                      <img
                        src={drop.account.thumbnail.imageUrl}
                        alt={drop.account.nickname}
                        className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-muted flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">
                          Slot {drop.slot}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {drop.account.priceTier.code}
                        </Badge>
                        {drop.account.isCompetitive && (
                          <Badge variant="secondary" className="text-xs">
                            Comp
                          </Badge>
                        )}
                        <Badge className="text-xs bg-green-600 hover:bg-green-600">
                          -{drop.discount.toFixed(0)}%
                        </Badge>
                      </div>
                      <p className="text-sm mt-1 font-semibold truncate">
                        {drop.account.nickname}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {drop.account.accountCode} · {drop.account.accountRank}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Duration:{" "}
                        <span className="font-medium text-foreground">
                          {drop.priceList.duration}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── CONFIGURATION ── */}
          <TabsContent value="config" className="flex-1 overflow-y-auto">
            {isLoadingConfig || !priceTiersLoaded ? (
              <div className="flex justify-center py-10">
                <Loader2Icon
                  className="animate-spin text-muted-foreground"
                  size={24}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-5 pb-2 pr-1">
                {/* Discount Range */}
                <div>
                  <p className="text-sm font-semibold mb-3">
                    Discount Range (%)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="discountMin">Minimum</Label>
                      <Input
                        id="discountMin"
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        placeholder="e.g. 10"
                        value={discountMin}
                        onChange={(e) => setDiscountMin(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="discountMax">Maximum</Label>
                      <Input
                        id="discountMax"
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        placeholder="e.g. 30"
                        value={discountMax}
                        onChange={(e) => setDiscountMax(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Per-slot config */}
                {([1, 2, 3] as const).map((slotNum) => {
                  const idx = slotNum - 1;
                  const durationOptions = buildDurationOptions(
                    priceTiers,
                    slots[idx].priceTierIds
                  );
                  return (
                    <div key={slotNum}>
                      <p className="text-sm font-semibold mb-3">
                        Slot {slotNum} Filter
                      </p>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <Label>Allowed Price Tiers</Label>
                          <p className="text-xs text-muted-foreground">
                            Accounts in these tiers are eligible for this slot.
                            Leave empty to allow all tiers.
                          </p>
                          <MultiSelect
                            modalPopover={true}
                            options={priceTierOptions}
                            defaultValue={slots[idx].priceTierIds}
                            onValueChange={(v) => updateSlotTiers(idx, v)}
                            placeholder="All price tiers"
                            resetOnDefaultValueChange
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label>Allowed Durations</Label>
                          <p className="text-xs text-muted-foreground">
                            Only these durations can be randomly assigned to
                            this slot. Leave empty to allow all durations.
                            {slots[idx].priceTierIds.length > 0 &&
                              " Options are filtered to the selected price tiers."}
                          </p>
                          <MultiSelect
                            modalPopover={true}
                            options={durationOptions}
                            defaultValue={slots[idx].durationValues}
                            onValueChange={(v) =>
                              updateSlotDurations(idx, v)
                            }
                            placeholder="All durations"
                            resetOnDefaultValueChange
                          />
                        </div>
                      </div>
                      {slotNum < 3 && <Separator className="mt-4" />}
                    </div>
                  );
                })}

                <Separator />

                {/* Account whitelist */}
                <div>
                  <p className="text-sm font-semibold mb-1">
                    Account Whitelist
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Only these accounts can be picked. Leave empty to allow all
                    available accounts.
                  </p>
                  <MultiSelect
                    modalPopover={true}
                    options={accountOptions}
                    defaultValue={allowedAccountIds}
                    onValueChange={setAllowedAccountIds}
                    placeholder="All available accounts"
                    resetOnDefaultValueChange
                  />
                </div>

                <Button
                  onClick={handleSaveConfig}
                  disabled={isSavingConfig}
                  className="w-full"
                >
                  {isSavingConfig ? (
                    <Loader2Icon className="animate-spin" size={16} />
                  ) : null}
                  Save Configuration
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
