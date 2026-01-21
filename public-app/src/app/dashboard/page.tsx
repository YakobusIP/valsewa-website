"use client";

import {
  Fragment,
  useEffect,
} from "react";


import { useAuth } from "@/hooks/useAuth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Dashboard() {
  const router = useRouter();

  const { username} = useAuth();

   const orders = [
    {
      id: 1,
      purchaseDate: "2024-01-15",
      accountCode: "ACC-001",
      rentalPeriod: "7 days",
      status: "ongoing",
      username: "player123",
      password: "pass123"
    },
    {
      id: 2,
      purchaseDate: "2024-01-10",
      accountCode: "ACC-002",
      rentalPeriod: "3 days",
      status: "pending",
      username: "gamer456",
      password: "pass456"
    },
    {
      id: 3,
      purchaseDate: "2024-01-05",
      accountCode: "ACC-003",
      rentalPeriod: "14 days",
      status: "completed",
      username: "player789",
      password: "pass789"
    },
  ];

  useEffect(() => {
    document.title = "Dashboard | Valsewa";
  }, []);

  const getStatusStyle = (status: string) => {
    if (status.toLowerCase() === "ongoing") {
      return "bg-[#C70515] text-white";
    }
    return "bg-white text-black";
  };

  return (
    <Fragment>
      <main className="min-h-[100dvh] bg-[#0F0F0F] md:pb-64 pb-32">
        <div className="container flex flex-col mx-auto p-4 xl:p-8 gap-4">

          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex items-center gap-2 w-fit rounded-md px-3 py-2 hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-[#C70515] focus:ring-offset-2 focus:ring-offset-black transition"
          >
            <Image
              src="/arrow-back.svg"
              alt="Back"
              width={24}
              height={24}
            />
          </button>

          <h1 className="pt-10 pb-5 text-white text-5xl font-bold">{username?.toUpperCase()}&apos;S DASHBOARD</h1>
          
          <text className="font-semibold text-xl text-white">Username</text>
          <text className="text-base text-white">{username}</text>

          
          <h1 className="text-white text-5xl font-bold pt-10">MY ORDER</h1>

         <div className="rounded-sn overflow-hidden py-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#C70515] border-b border-neutral-800 hover:bg-[#C70515] h-20">
                  <TableHead className="text-white text-center text-lg">Purchase Date</TableHead>
                  <TableHead className="text-white text-center text-lg">Order</TableHead>
                  <TableHead className="text-white text-center text-lg">Rental Period</TableHead>
                  <TableHead className="text-white text-center text-lg">Status</TableHead>
                  <TableHead className="text-white text-center text-lg">Username</TableHead>
                  <TableHead className="text-white text-center text-lg">Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow 
                    key={order.id} 
                    className="bg-[#F9FAFB1A] border-b border-neutral-800 hover:bg-[#F9FAFB1A] h-20"
                  >
                    <TableCell className="text-white text-center text-lg">{order.purchaseDate}</TableCell>
                    <TableCell className="text-white text-center text-lg">{order.accountCode}</TableCell>
                    <TableCell className="text-white text-center text-lg">{order.rentalPeriod}</TableCell>
                    <TableCell className="text-center text-lg">
                      <span
                        className={cn(
                          "inline-flex items-center self-center justify-center px-3 py-2 rounded-md text-lg",
                          getStatusStyle(order.status)
                        )}
                      >
                        {order.status == "ongoing" ? "On Going Order" : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white text-center text-lg">{order.username}</TableCell>
                    <TableCell className="text-white text-center text-lg">{order.password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          </div>
      </main>
    </Fragment>
  );
}
