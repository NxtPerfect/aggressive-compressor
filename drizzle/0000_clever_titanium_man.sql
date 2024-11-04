CREATE TABLE `files` (
	`fileHash` text PRIMARY KEY NOT NULL,
	`originalPath` text NOT NULL,
	`sourcePath` text NOT NULL,
	`rawSize` integer DEFAULT 0 NOT NULL,
	`compressedSize` integer DEFAULT 999,
	`howManyTimesUploaded` integer DEFAULT 1,
	`toBeDeleted` integer DEFAULT 0,
	`expirationDate` text DEFAULT '31-12-9999' NOT NULL,
	`uploadedBy` text,
	FOREIGN KEY (`uploadedBy`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_fileHash_unique` ON `files` (`fileHash`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer DEFAULT 404 NOT NULL,
	`email` text PRIMARY KEY DEFAULT 'not@set.yet' NOT NULL,
	`password` text DEFAULT 'change_me',
	`subscriptioneExpirationDate` text DEFAULT 'NONE',
	`totalBandwidthLeftInGB` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);