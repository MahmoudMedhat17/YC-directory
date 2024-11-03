import { type SchemaTypeDefinition } from 'sanity';
import { author } from './authorType';
import { startUp } from "./startUp";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startUp],
};
