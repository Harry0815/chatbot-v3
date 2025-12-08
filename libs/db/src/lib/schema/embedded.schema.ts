import {
  pgSchema,
  serial,
  text,
  customType,
  vector
} from 'drizzle-orm/pg-core';

// export const embeddingSchema = pgSchema('teaching')
//
// // Workaround für 'vector(1536)' Spalte
// export const vector = customType<{
//   data: number[];
//   driverData: string; // wird intern als string gespeichert (z. B. '[0.1, 0.2, ...]')
// }>({
//   dataType() {
//     return 'vector(1536)';
//   },
// });
//
// export const embeddingDocument = embeddingSchema.table('documents', {
//   id: serial('id').primaryKey(),
//   content: text('content').notNull(),
//   embedding: vector('embedding'),
// });

export const embeddingSchema = pgSchema('teaching')
export const embeddingDocument = embeddingSchema.table('documents', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  embedding: vector( 'embedding', {
    dimensions: 1536,
  }),
});
