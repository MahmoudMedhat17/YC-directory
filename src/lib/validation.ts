import { z } from "zod";


export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(500),
    category: z.string().min(3).max(50),
    link: z.string().url().refine(async (url) => {
        try {
            const res = await fetch(url, { method: "HEAD" });

            if (!res.ok) return false;

            const contentType = res.headers.get("Content-type");

            return contentType?.startsWith("image/");
        } catch (error) {
            console.error("Error during fetch:", error);
            return false;
        }
    },
        { message: "URL must point to an image." }),
    pitch: z.string()
});