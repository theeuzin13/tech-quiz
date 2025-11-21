import { createAdminSeed } from "./admin.seed";

async function runSeeds() {
  try {
    await createAdminSeed();
    console.log("All seeds executed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error executing seeds:", error);
    process.exit(1);
  }
}

void runSeeds();