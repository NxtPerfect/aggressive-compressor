import { sqliteTable, text, integer, SQLiteColumn } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').unique().default(0).notNull(),
  email: text('email').primaryKey().default("not@set.yet").notNull(),
  password: text('password').default("changeme"),
  subscriptioneExpirationDate: text('subscriptioneExpirationDate').default("NONE"),
  totalBandwidthLeftInGB: integer('totalBandwidthLeftInGB').default(0)
});

export const files = sqliteTable('files', {
  hash: text('hash').primaryKey().notNull(),
  originalPath: text('originalPath').notNull(),
  sourcePath: text('sourcePath').notNull(),
  rawSizeBytes: integer('rawSize').notNull(),
  compressedSizeBytes: integer('compressedSize').default(0),
  howManyTimesUploaded: integer('howManyTimesUploaded').default(1),
  toBeDeleted: integer('toBeDeleted').default(0),
  expirationDate: text('expirationDate').notNull(),
  uploadedBy: integer('uploadedBy').references((): SQLiteColumn => users.id)
});
