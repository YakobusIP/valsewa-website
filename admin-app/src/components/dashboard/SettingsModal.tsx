import { useEffect, useState } from "react";

import { settingService } from "@/services/setting.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/hooks/useToast";

export default function SettingsModal({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [reminderText, setReminderText] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const SETTING_KEY = "reminder_text";

  const fetchReminderText = async () => {
    setLoading(true);
    try {
      const data = await settingService.getSetting(SETTING_KEY);
      setReminderText(data.value);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error fetching settings",
          description: error.message
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOperationalHours = async () => {
    try {
      const data = await settingService.getOperationalHours();
      setOpenTime(data.open);
      setCloseTime(data.close);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error fetching operational hours",
          description: error.message
        });
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const promises: Promise<unknown>[] = [];

      promises.push(
        settingService.updateSetting(SETTING_KEY, reminderText)
      );

      if (openTime || closeTime) {
        if (!openTime || !closeTime) {
          throw new Error("Operational hours must be fully filled");
        }

        if (openTime >= closeTime) {
          throw new Error("Open time must be earlier than close time");
        }

        promises.push(
          settingService.updateOperationalHours({
            open: openTime,
            close: closeTime
          })
        );
      }

      await Promise.all(promises);

      toast({
        title: "Settings saved",
        description: "All settings updated successfully."
      });

      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error saving settings",
          description: error.message
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchReminderText();
      fetchOperationalHours();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Global Settings</DialogTitle>
          <DialogDescription>App global settings</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reminder">Reminder Text</Label>
            <Textarea
              id="reminder"
              className="h-[300px]"
              placeholder="Enter reminder text here..."
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Anda dapat menggunakan placeholder seperti {"{username}"},{" "}
              {"{password}"}, {"{accountCode}"}, dan {"{expired}"}.
            </p>
          </div>
          <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Operational Hours (WIB)</Label>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground">Open</Label>
                <input
                  type="time"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground">Close</Label>
                <input
                  type="time"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-2"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Last order akan otomatis dihitung 30 menit sebelum jam tutup.
            </p>
          </div>
        </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
