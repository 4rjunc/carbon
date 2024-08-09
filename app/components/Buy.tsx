// create an infinite scroll to item display
// when item is clicked openup a modal to pay -> if payment is succesfull -> download the pdf from the web3storage

//ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//buyhandler
import BuyButton from "./BuyButton";

const Buy = () => {
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
            <BuyButton />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Buy;
