// create an infinite scroll to item display
// when item is clicked openup a modal to pay -> if payment is succesfull -> download the pdf from the web3storage

import { useState, useEffect } from "react";
//abi
import CarbonMarketplace from "../contract/CarbonMarketplace.json";
import { ethers } from "ethers";
import { useEthersSigner } from "../config/ether";

//ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const CONTRACT_ADDRESS = "0xd369a1d59a375E7771c1A958e2Bf5b6bC0fFAE5D";

const Buy = () => {
  const signer = useEthersSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CarbonMarketplace,
    signer,
  );

  const [allPapers, setAllPapers] = useState([]);
  console.log("contract:", contract, "signer", signer);
  const handleFetch = async () => {
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

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold font-[#403d39]">Explore knowledge</p>
      {/*create map to feed out papers*/}
      <div className="mt-3">
        <Card>
          <CardHeader>
            <CardTitle>Paper Header</CardTitle>
            <CardDescription>✍🏼Author: Mithun A. V.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </p>
          </CardContent>
          <CardFooter>
            <div className="bg-[#eb5e28] rounded-md py-1 px-3">
              <AlertDialog>
                <AlertDialogTrigger className="text-white">
                  Buy 🎉
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-[#CCC5B9]">
                      Cancel ❌{" "}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      //onClick={handleBuy}
                      className="hover:bg-[#eb5e28] "
                    >
                      Confirm Order ✅{" "}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Buy;
