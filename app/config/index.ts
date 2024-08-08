import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

//console.log("projectId", process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID);
export const projectId: string = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID ?? "";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const config = defaultWagmiConfig({
  projectId,
  chains: [mainnet, sepolia],
  metadata: {
    name: "carbon",
    description: "share, buy and sell your scientific papers",
    url: "https://myapp.com",
    icons: ["https://myapp.com/favicon.ico"],
  },
  enableWalletConnect: true,
  enableEIP6963: true,
  enableCoinbase: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});
