import { AppDataSource } from "src/config/data-source";
import { createAdminSeed } from "./admin.seed";
import { createCategoriesSeed } from "./categories.seed";

async function runSeeds() {
  try {
    await AppDataSource.initialize();

    await createAdminSeed();
    await createCategoriesSeed();

    console.log("All seeds executed successfully.");
  } catch (error) {
    console.error("Error executing seeds:", error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(0);
  }
}

void runSeeds();
