import { ChangeEventHandler, memo, useEffect, useState } from "react";

import LogoutButton from "@/components/dashboard/LogoutButton";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import useWideScreen from "@/hooks/useWideScreen";

import { FailedJobs, ResetLogs } from "@/types/account.type";

import {
  ChartNoAxesCombinedIcon,
  CircleDollarSignIcon,
  CirclePlusIcon,
  CoinsIcon,
  ImageIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  ShirtIcon,
  UserRoundCogIcon
} from "lucide-react";
import { useDebounce } from "use-debounce";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import NotificationsModal from "./NotificationsModal";

type Props = {
  onDebounced: (q: string) => void;
  failedJobs: FailedJobs[];
  resetLogs: ResetLogs[];
  resetParent: () => Promise<void>;
  onOpenAddAccount: () => void;
  onOpenSkinManagement: () => void;
  onOpenPriceTiers: () => void;
  onOpenCarouselManagement: () => void;
  onOpenVouchers: () => void;
  onOpenUserList: () => void;
  onOpenTransactionList: () => void;
  onOpenSettings: () => void;
};

const SearchInput = memo(
  ({
    value,
    onChange
  }: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }) => (
    <Input
      startIcon={<SearchIcon size={18} className="text-muted-foreground" />}
      placeholder="Search account..."
      parentClassName="w-full xl:w-[32rem]"
      value={value}
      onChange={onChange}
    />
  )
);

export default function Navbar({
  onDebounced,
  failedJobs,
  resetLogs,
  resetParent,
  onOpenAddAccount,
  onOpenSkinManagement,
  onOpenPriceTiers,
  onOpenCarouselManagement,
  onOpenVouchers,
  onOpenUserList,
  onOpenTransactionList,
  onOpenSettings
}: Props) {
  const [raw, setRaw] = useState("");
  const [debounced] = useDebounce(raw, 1000);

  const isWideScreen = useWideScreen();

  useEffect(() => {
    onDebounced(debounced);
  }, [debounced, onDebounced]);

  return (
    <div className="flex items-center top-0 sticky justify-between p-4 border-b bg-background z-50 gap-4">
      <div className="flex items-center gap-4 flex-row-reverse xl:flex-row">
        <SearchInput value={raw} onChange={(e) => setRaw(e.target.value)} />
        {isWideScreen ? (
          <NavigationMenu>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenAddAccount()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Add New Account
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Create a new account manually.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenSkinManagement()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Skin Management
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage all skins.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenPriceTiers()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Price Tiers
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage price tiers.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenVouchers()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Vouchers
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage vouchers.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Operations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenCarouselManagement()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Carousel Management
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Manage carousel slides.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenUserList()}
                      >
                        <div className="text-sm font-medium leading-none">
                          User Account List
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View and manage user accounts.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenTransactionList()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Transaction List
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View and manage transactions.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>System</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => onOpenSettings()}
                      >
                        <div className="text-sm font-medium leading-none">
                          Settings
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Global system settings.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    Product
                  </h3>
                  <Separator />
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenAddAccount}
                    >
                      <CirclePlusIcon />
                      Add New Account
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenSkinManagement}
                    >
                      <ShirtIcon />
                      Skin Management
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenPriceTiers}
                    >
                      <CircleDollarSignIcon />
                      Price Tiers
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenVouchers}
                    >
                      <CoinsIcon />
                      Vouchers
                    </Button>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    Operations
                  </h3>
                  <Separator />
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenCarouselManagement}
                    >
                      <ImageIcon />
                      Carousel Management
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenUserList}
                    >
                      <UserRoundCogIcon />
                      User Account List
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenTransactionList}
                    >
                      <ChartNoAxesCombinedIcon />
                      Transaction List
                    </Button>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    System
                  </h3>
                  <Separator />
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="justify-start px-2 w-full hover:text-foreground"
                      onClick={onOpenSettings}
                    >
                      <SettingsIcon />
                      Settings
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      <div className="flex items-center gap-4">
        <NotificationsModal
          failedJobs={failedJobs}
          resetLogs={resetLogs}
          resetParent={resetParent}
        />
        <LogoutButton />
      </div>
    </div>
  );
}
