import { UserEntity } from "src/common/entities/user.entity";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "src/config/data-source";

export async function createAdminSeed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(UserEntity);

  const password = process.env.ADMIN_PASSWORD!;
  const username = process.env.ADMIN_USERNAME!;

  const adminExists = await userRepository.findOneBy({ isAdmin: true });

  if (!adminExists) {
    const passwordHash = await bcrypt.hash(password, 10);

    const adminUser = userRepository.create({
      username: username,
      password: passwordHash,
      isAdmin: true,
    });

    await userRepository.save(adminUser);
    console.log("Admin user created successfully.");
  }
}
