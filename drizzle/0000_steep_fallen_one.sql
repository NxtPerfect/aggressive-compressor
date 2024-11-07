CREATE TABLE `files` (
	`fileHash` text PRIMARY KEY NOT NULL,
	`originalPath` text NOT NULL,
	`sourcePath` text NOT NULL,
	`rawSize` integer NOT NULL,
	`compressedSize` integer DEFAULT 999,
	`howManyTimesUploaded` integer DEFAULT 1,
	`toBeDeleted` integer DEFAULT 0,
	`expirationDate` text NOT NULL,
	`uploadedBy` text,
	FOREIGN KEY (`uploadedBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer DEFAULT 0 NOT NULL,
	`email` text PRIMARY KEY DEFAULT 'not@set.yet' NOT NULL,
	`password` text DEFAULT 'changeme',
	`subscriptioneExpirationDate` text DEFAULT 'NONE',
	`totalBandwidthLeftInGB` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);