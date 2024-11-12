import { defineQuery } from "next-sanity"


export const STARTUPQUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search] | order(_createdAt desc){
  _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id, name, image, bio
    },
    views,
    description,
    category,
    image,
}`);



export const STARTUP_QUERY_BY_ID = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id, name, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
}`);



export const START_QUERY_VIEWS_BY_ID = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  views
}`);



export const AUTHOR_QUERY_BY_ID = defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
    id,
    name,
    userName,
    email,
    image,
    bio
}`);


export const AUTHOR_QUERY_ID = defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
    id,
    name,
    userName,
    email,
    image,
    bio
}`);


export const AUTHOR_QUERY_STARTUPS = defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
    id,
    name,
    userName,
    email,
    image,
    bio
}`);



export const STARTUPS_QUERY_BY_USER = defineQuery(`*[_type == "startup" && author._ref == $id | order(_createdAt desc)][0]{
  _id,
    title,
    slug,
    _createdAt,
    author ->{
      _id, name, image, bio
    },
    views,
    description,
    category,
    image
}
`);
