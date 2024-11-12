import { type SchemaTypeDefinition } from 'sanity';
import { author } from './authorType';
import { startUp } from "./startUp";
import { playlist } from "./playlist";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startUp, playlist],
};
