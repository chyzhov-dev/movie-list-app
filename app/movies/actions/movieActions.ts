'use server';

import { db } from '@/drizzle/db';
import {  MoviesTable } from '@/drizzle/schema';
import { count, desc, eq } from 'drizzle-orm';

const MAX_PER_PAGE = 50;
export const getMovies = async (page: number = 1, perPage: number = 10) => {
  if (perPage > MAX_PER_PAGE) {
    perPage = MAX_PER_PAGE;
  }
  const offset = (page - 1) * perPage;
  const movies = await db
    .select()
    .from(MoviesTable)
    .orderBy( desc(MoviesTable.id))
    .limit(perPage)
    .offset(offset);

  const [total] = await db.select({count: count()}).from(MoviesTable);
  return { movies, total: total.count, perPage, page };
}

export const addMovie = async (name: string, year: number, image: string) => {
  await db.insert(MoviesTable).values({
    name,
    year,
    image: '',
    base64preview: image
  })
}

export const editMovie = async (id: number, name: string, year: number, image: string) => {
  await db.update(MoviesTable).set({
    name,
    year,
    image: '',
    base64preview: image
  }).where(eq(MoviesTable.id, id))
}

export const findMovie = async (id: number) => {
  const [movie] = await db.select().from(MoviesTable).where(eq(MoviesTable.id, id))
  return movie;
}


