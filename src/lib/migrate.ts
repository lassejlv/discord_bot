import fs from "fs";
import ora from "ora";
import { name } from "../../package.json";
import { $ } from "bun";

const migrateFolder = "prisma/migrations"

const latestMigrationFolder = fs
  .readdirSync(migrateFolder)
  .filter((f) => fs.statSync(`${migrateFolder}/${f}`).isDirectory())
  .sort()
  .pop();


const spinner = ora("Applying migrations").start();

await $`turso db shell ${name} < ${migrateFolder}/${latestMigrationFolder}/migration.sql`
  .quiet()
  .then(() => {
    spinner.succeed("Migrations applied!");
  })
  .catch((err) => {
    spinner.fail("Failed to apply migrations!");
    console.error(err);
    process.exit(1);
  });
