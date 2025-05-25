"use client";

import { MOCK_TOKEN_ADDRESS, MOCK_USDC_ABI } from "@/abi/mock-usdc-abi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "viem";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        abi: MOCK_USDC_ABI,
        address: MOCK_TOKEN_ADDRESS,
        functionName: "name",
      },
      {
        abi: MOCK_USDC_ABI,
        address: MOCK_TOKEN_ADDRESS,
        functionName: "symbol",
      },
      {
        abi: MOCK_USDC_ABI,
        address: MOCK_TOKEN_ADDRESS,
        functionName: "decimals",
      },
      {
        abi: MOCK_USDC_ABI,
        address: MOCK_TOKEN_ADDRESS,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
    ],
  });

  const name = data?.[0].result;
  const symbol = data?.[1].result;
  const decimals = data?.[2].result;
  const balanceUser = data?.[3].result;

  const { writeContract } = useWriteContract();

  const BalanceUser = () => {
    if (!isConnected) {
      return <h1>Please connect your account!</h1>;
    }

    if (isLoading) {
      return <p>Loading....</p>;
    }

    return (
      <p>
        balanceUser : {formatUnits(balanceUser || BigInt(0), decimals || 18)}
      </p>
    );
  };

  const MintComponent = () => {
    return (
      <form className="bg-white text-black">
        <div className="gap-2 justify-between">
          <label>Address user</label>
          <input className="border-black border-2" />
        </div>
        <div>
          <label>Amount</label>
          <input type="number" className="border-black border-2" />
        </div>
        <input
          type="submit"
          className="bg-blue-400 text-black rounded-lg p-4"
        />
      </form>
    );
  };

  return (
    <div>
      <ConnectButton />
      <p>Token Name : {name}</p>
      <p>Symbol: {symbol}</p>
      <p>Decimals: {decimals}</p>
      <BalanceUser />
      <h1>~Mint~</h1>
      <MintComponent />
    </div>
  );
}