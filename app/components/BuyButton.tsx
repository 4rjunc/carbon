// handle buy actions, get the tokenID or whateverdata required to map the paper
import { useState } from "react";
//ether.js
import { ethers } from "ethers";
import CarbonMarketplace from "../contract/CarbonMarketplace.json";
import { useEthersSigner } from "../config/ether";

//shadcn ui components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BuyButton = () => {
  const signer = useEthersSigner();
  const contract = new ethers.Contract(
    "0xa5752293C773E95dA197dF38D17381b733c8A087",
    CarbonMarketplace,
    signer,
  );

  const [allPapers, setAllPapers] = useState([]);
  console.log("contract:", contract, "signer", signer);
  const handleBuy = async () => {
    try {
      const [papers, tokenIds] = await contract.getAllPapers();
      setAllPapers(
        papers.map((paper: any, index: any) => ({
          ...paper,
          tokenId: tokenIds[index].toString(),
        })),
      );
    } catch (error) {
      console.error("Error loading all papers:", error);
    } finally {
      console.log("papers", allPapers);
    }
  };

  return (
    <div className="bg-[#eb5e28] rounded-md py-1 px-3">
      <AlertDialog>
        <AlertDialogTrigger className="text-white">Buy 🎉</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-[#CCC5B9]">
              Cancel ❌{" "}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBuy}
              className="hover:bg-[#eb5e28] "
            >
              Confirm Order ✅{" "}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BuyButton;
