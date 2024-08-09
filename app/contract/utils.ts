import { CarbonMarketplace } from "./CarbonMarketplace.json";
import { useEthersSigner } from "../config/ether";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x38972f0e23ceFe9b4e810d96bCfC627AE0B67129";

export const handlePaperPublish = (values, hash) => {
  const signer = useEthersSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CarbonMarketplace,
    signer,
  );
};
