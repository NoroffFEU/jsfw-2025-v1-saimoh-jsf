import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const contactSchema = z.object({          
  fullName: z.string().min(3, "Minimum 3 characters"),
  subject: z.string().min(3, "Minimum 3 characters"),
  email: z.string().email("Must be a valid email"),
  body: z.string().min(3, "Minimum 3 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    toast("Message sent! Thank you for reaching out.");
    reset();
  };

  return (
    <div className="container max-w-lg py-10">
      <h1 className="mb-2 text-3xl text-foreground">Contact Us</h1>
      <p className="mb-8 text-muted-foreground">Fill out the form below and we'll get back to you.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
          {errors.fullName && <p className="text-xs text-discount">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" {...register("subject")} placeholder="Order inquiry" />
          {errors.subject && <p className="text-xs text-discount">{errors.subject.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
          {errors.email && <p className="text-xs text-discount">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="body">Body</Label>
          <Textarea id="body" {...register("body")} placeholder="Your message..." rows={5} />
          {errors.body && <p className="text-xs text-discount">{errors.body.message}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactPage;
