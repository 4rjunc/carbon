// handle buy actions, get the tokenID or whateverdata required to map the paper
//
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
            <AlertDialogAction className="hover:bg-[#eb5e28] ">
              Confirm Order ✅{" "}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BuyButton;
