"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";

const Startform = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const isPending = false;

  return (
    <form action={() => {}} className="startup-form ">
      <div>
        <label htmlFor="Title" className="startup-form_label">
          Title
        </label>
        <Input
          id="Title"
          name="Title"
          placeholder="Title"
          className="startup-form_input"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="Description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="Description"
          name="Description"
          placeholder="Short description of your startup idea"
          className="startup-form_textarea"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="Category" className="startup-form_label">
          Category
        </label>
        <Input
          id="Category"
          name="Category"
          placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
          className="startup-form_input"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="Image/Video Link" className="startup-form_label">
          Image/Video Link
        </label>
        <Input
          id="Image/Video Link"
          name="Image/Video Link"
          placeholder="Paste a link to your demo or promotional media"
          className="startup-form_input"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div>
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
        {isPending ? "Submitting..." : "Submit your pitch"}{" "}
        <Send className="size-6 ml-1" />
      </Button>
    </form>
  );
};

export default Startform;
