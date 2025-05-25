import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia, mainnet } from "viem/chains";

export const config = getDefaultConfig({
  appName: 'b4_fe',
  projectId: process.env.WALLET_CONNECT_PROJECT_ID || "b4fe-id",
  chains: [arbitrumSepolia,mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});