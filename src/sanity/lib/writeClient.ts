import "server-only";
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { token } from "../env";


export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion: "vX",
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token: token
});




if (!writeClient.config().token) {
    throw new Error("Wrong write client token.");
};