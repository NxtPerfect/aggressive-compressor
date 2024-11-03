import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
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
    howManyTimesUploaded: integer('howManyTimesUploaded').default(1)
});
