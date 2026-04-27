"use client";

import { useEffect, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { fetchSkins } from "@/services/skin.service";

import { Skin } from "@/types/skin.type";

import { Search, X } from "lucide-react";
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
  fallbackSkins = [],
}: SkinSearchModalProps) {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setIsLoading(true);
    fetchSkins().then((result) => {
      if (cancelled) return;
      setSkins(result.length > 0 ? result : fallbackSkins);
      setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [open, fallbackSkins]);

  const filteredSkins = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skins;
    return skins.filter((s) => s.name.toLowerCase().includes(q));
  }, [skins, query]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-neutral-950 border border-white/20 rounded-2xl w-3/4 max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
          <h2 className="text-white font-semibold font-instrumentSans text-lg">Search Skins</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pb-3 shrink-0">
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
            <p className="text-white/40 text-sm text-center py-8">Loading skins...</p>
          ) : filteredSkins.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-8">
              {skins.length === 0 ? "No skins available. Please log in to search skins." : "No skins matched."}
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
      </div>
    </div>
  );
}
