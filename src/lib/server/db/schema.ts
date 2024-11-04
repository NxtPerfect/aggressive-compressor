import { sqliteTable, text, integer, SQLiteColumn } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').unique().default(404).notNull(),
    email: text('email').primaryKey().unique().default("not@set.yet").notNull(),
    password: text('password').default("change_me"),
    subscriptioneExpirationDate: text('subscriptioneExpirationDate').default("NONE"),
    totalBandwidthLeftInGB: integer('totalBandwidthLeftInGB').default(0)
});

export const files = sqliteTable('files', {
    hash: text('fileHash').primaryKey().unique().notNull(),
    originalPath: text('originalPath').notNull(),
    sourcePath: text('sourcePath').notNull(),
    rawSizeBytes: integer('rawSize').default(0).notNull(),
    compressedSizeBytes: integer('compressedSize').default(999),
    howManyTimesUploaded: integer('howManyTimesUploaded').default(1),
    toBeDeleted: integer('toBeDeleted').default(0),
    expirationDate: text('expirationDate').default("31-12-9999").notNull(),
    uploadedBy: text('uploadedBy').references((): SQLiteColumn => users.id)
});
