//add a file upload modal, contains deatils to be added, title, content brief, author, price
//upload the file + metadata to ipfs -> store file link + other metadata in ploygon fetch the data to buy page
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

//axios
import axios from "axios";

//form handling modules
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//web3.storage
import lighthouse from "@lighthouse-web3/sdk";
import { useEthersSigner } from "../config/ether";
import { useAccount } from "wagmi";
import { signMessage } from "@wagmi/core";
import { config } from "../config/index";

//shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  authorName: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  paperTitle: z.string().min(5, {
    message: "Paper title must be at least 5 characters.",
  }),
  paperInfo: z.string().min(20, {
    message: "Paper info must be at least 20 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  file: z.instanceof(File).refine((file) => file.size <= 10000000, {
    message: "File size must be less than 10MB.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const Sell: React.FC = () => {
  const [progress, setProgress] = useState(13);
  const { toast } = useToast();
  const account = useAccount();
  const signer = useEthersSigner();
  const [lighthouseAPI, setLighthouseAPI] = useState<string | null>("");
  const [address, setAddress] = useState("");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorName: "",
      paperTitle: "",
      paperInfo: "",
      price: 0,
    },
  });

  const getApiKey = async () => {
    try {
      const verificationMessage = (
        await axios.get(
          `https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`,
        )
      ).data;
      const result = await signMessage(config, {
        message: verificationMessage,
      });
      const response = await lighthouse.getApiKey(address, result);
      console.log("lighthouse reponse", response);
      setLighthouseAPI(response.data.apiKey);
    } catch (error) {
      console.error("getApiKey lighthouse:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    getApiKey();
    //toast({
    //  title: "Verificaton Mail Sent! ✉️ ",
    //  description: `Please check you mail: ${values.email}`,
    //});
    console.log("values", values);
  };

  useEffect(() => {
    setAddress(account.address?.toString() || "");
    const timer = setTimeout(() => setProgress(20), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold font-[#403d39]">
        share your knowledge to the world
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-10 mt-3"
        >
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paperTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter paper title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormDescription>Max file size: 10MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paperInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paper Info</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of your paper"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div></div>
          <Button
            type="submit"
            className="bg-[#252422] hover:bg-[#eb5e28] font-semibold w-1/2"
          >
            Submit 🚀
          </Button>
        </form>
      </Form>
      <Toaster />
      <Progress value={progress} className="w-[60%] mt-3" />
    </div>
  );
};

export default Sell;
