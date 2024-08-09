// @ts-nocheck
//
import CarbonMarketplace from "./CarbonMarketplace.json";
import { useEthersSigner } from "../config/ether";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x38972f0e23ceFe9b4e810d96bCfC627AE0B67129";

export const handlePaperPublish = async (values: any, hash: string) => {
  const signer = useEthersSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CarbonMarketplace,
    signer,
  );
  try {
    const tx = contract.publishPaper(
      values.authorName,
      values.paperName,
      values.paperInfo,
      values.price,
      hash,
    );
    //
    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log("Transaction successful with hash:", receipt.transactionHash);
    console.log(
      "Paper published with token ID:",
      receipt.events[0].args.tokenId.toString(),
    );
    return True;
  } catch (error) {
    console.error("Error publishing paper:", error);
    return False;
  }
};
