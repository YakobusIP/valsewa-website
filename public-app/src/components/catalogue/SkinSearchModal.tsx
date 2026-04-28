"use client";

import { useEffect, useState } from "react";

import { fetchSkins } from "@/services/skin.service";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Skin } from "@/types/skin.type";

import { Search } from "lucide-react";
import Image from "next/image";

interface SkinSearchModalProps {
  open: boolean;
  onClose: () => void;
  selectedSkins: Skin[];
  onToggleSkin: (skin: Skin) => void;
  fallbackSkins?: Skin[];
}

export function SkinSearchModal({
  open,
  onClose,
  selectedSkins,
  onToggleSkin,
  fallbackSkins = []
}: SkinSearchModalProps) {
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (!open) {
      setFilteredSkins([]);
      setQuery("");
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    // Fetch from backend with current query (or initial fetch with no query)
    fetchSkins(debouncedQuery || undefined, 50).then((result) => {
      if (cancelled) return;
      setFilteredSkins(result.length > 0 ? result : []);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [open, debouncedQuery, fallbackSkins]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-950 border-white/20 max-w-3xl max-h-[85vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-3 shrink-0 border-b border-white/10">
          <DialogTitle className="text-white font-semibold font-instrumentSans text-lg">
            Search Skins
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-6 py-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by skin name..."
              className="pl-9 bg-neutral-900 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-red-600/40"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-5">
          {isLoading ? (
            <p className="text-white/40 text-sm text-center py-8">
              Loading skins...
            </p>
          ) : filteredSkins.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-8">
              {query
                ? "No skins matched your search."
                : "No skins available. Please log in to search skins."}
            </p>
          ) : (
            <div className="space-y-1">
              {filteredSkins.map((skin) => {
                const checked = selectedSkins.some((s) => s.id === skin.id);
                return (
                  <div
                    key={skin.id}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                    onClick={() => onToggleSkin(skin)}
                  >
                    <Checkbox
                      id={`skin-modal-${skin.id}`}
                      checked={checked}
                      onCheckedChange={() => onToggleSkin(skin)}
                      className="border-white/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 shrink-0"
                    />
                    <div className="relative w-[100px] h-[160px] shrink-0 rounded overflow-hidden bg-neutral-900">
                      {skin.imageUrl ? (
                        <Image
                          src={skin.imageUrl}
                          fill
                          alt={skin.name}
                          className="object-contain"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <Label
                      htmlFor={`skin-modal-${skin.id}`}
                      className="text-sm text-white cursor-pointer flex-1"
                    >
                      {skin.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
