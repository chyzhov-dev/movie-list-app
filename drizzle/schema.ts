import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const UsersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export const MoviesTable = pgTable(
  'movies',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    year: integer('year').notNull(),
    image: text('image').notNull(),
    base64preview: text('base64preview'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
);