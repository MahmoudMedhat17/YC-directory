import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
};


export const parseServerAction = <T>(res: T) => {
  return JSON.parse(JSON.stringify(res));
};