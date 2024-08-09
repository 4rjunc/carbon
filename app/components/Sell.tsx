//add a file upload modal, contains deatils to be added, title, content brief, author, price
//upload the file + metadata to ipfs -> store file link + other metadata in ploygon fetch the data to buy page
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//shadcn components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  authorName: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
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
  file: z.instanceof(File).refine((file) => file.size <= 5000000, {
    message: "File size must be less than 5MB.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const Sell: React.FC = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorName: "",
      email: "",
      paperTitle: "",
      paperInfo: "",
      price: 0,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // implement file coin actions here
    console.log(values);
  }
  return (
    <div>
      <p className="text-xl font-semibold font-[#403d39]">
        share your knowledge to the world
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
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
                <FormDescription>Max file size: 5MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#252422] hover:bg-[#eb5e28] ">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Sell;
