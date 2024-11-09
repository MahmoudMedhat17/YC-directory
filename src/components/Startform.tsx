"use client";

import { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/router";

const Startform = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  // const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      console.log(formValues);

      await formSchema.parseAsync(formValues);

      // const result = await createdPitch(prevState, formData, pitch);
      // console.log(result);

      // if (result.status == "SUCCESS") {
      //   toast({
      //     title: "Success",
      //     description: "Your startup pitch has been created successfully",
      //   });

      //   router.push(`/startup/${result._id}`);
      // }

      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const allErrors = error.flatten().fieldErrors;

        setErrors(allErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="Title"
          name="title"
          required
          placeholder="Title"
          className="startup-form_input"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Short description of your startup idea"
          className="startup-form_textarea"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="Category"
          name="category"
          required
          placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
          className="startup-form_input"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="Link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="image/Video Link"
          name="image/Video Link"
          required
          placeholder="Paste a link to your demo or promotional media"
          className="startup-form_input"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="Image/Video Link" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(e) => {
            setPitch(e as string);
          }}
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          className="startup-form_editor"
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="startup-form_btn text-white"
      >
        {isPending ? "Submitting..." : "Submit your pitch"}
        <Send className="size-6 ml-1" />
      </Button>
    </form>
  );
};

export default Startform;
