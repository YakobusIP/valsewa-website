import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/useToast";
import { settingService } from "@/services/setting.service";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reminderText, setReminderText] = useState("");

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

  const handleSave = async () => {
    setLoading(true);
    try {
      await settingService.updateSetting(SETTING_KEY, reminderText);
      toast({
        title: "Settings saved",
        description: "Reminder text has been updated successfully."
      });
      setOpen(false);
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
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full xl:w-fit">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Global Settings</DialogTitle>
          <DialogDescription>
            App global settings
          </DialogDescription>
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
              Anda dapat menggunakan placeholder seperti {"{username}"}, {"{password}"}, {"{accountCode}"}, dan {"{expired}"}.
            </p>
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
