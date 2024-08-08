"use client";

// wallet component
import Connect from "./components/Connect";

//wagmi wallet utils
import { useAccount } from "wagmi";

//buy, sell, banner components
import Banner from "./components/Banner";
import Buy from "./components/Buy";
import Sell from "./components/Sell";

//ui components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const { address } = useAccount();
  console.log("Address", address);

  return (
    <main>
      <nav className=" border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="carbon"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              carbon
            </span>
          </a>
          <Connect />
        </div>
      </nav>

      <div className="flex justify-center mt-3">
        {!address ? (
          <Banner />
        ) : (
          <Tabs defaultValue="account" className="w-100">
            <TabsList>
              <TabsTrigger value="buy">Buy 📜</TabsTrigger>
              <TabsTrigger value="sell">Sell 💰</TabsTrigger>
            </TabsList>
            <TabsContent value="buy">
              {/*component to buy the papers*/}
              <Buy />
            </TabsContent>
            <TabsContent value="sell">
              {/*compoent to sell the papers*/}
              <Sell />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  );
}
