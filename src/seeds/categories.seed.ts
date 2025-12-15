import { AppDataSource } from 'src/config/data-source';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';

export async function createCategoriesSeed() {
  await AppDataSource.initialize();
  const categoryRepository = AppDataSource.getRepository(CategoryEntity);

  const categories = [
    { name: 'Frontend', icon: 'frontend' },
    { name: 'Backend', icon: 'backend' },
    { name: 'Database', icon: 'database' },
    { name: 'DevOps', icon: 'devops' },
    { name: 'Security', icon: 'security' },
    { name: 'Networks', icon: 'networks' },
    { name: 'Hardware', icon: 'hardware' },
    { name: 'Data Science', icon: 'data-science' },
    { name: 'Artificial Intelligence', icon: 'ai' },
  ];

  for (const category of categories) {
    const exists = await categoryRepository.findOne({
      where: { name: category.name },
    });

    if (!exists) {
      const entity = categoryRepository.create(category);
      await categoryRepository.save(entity);
    }
  }

  console.log('Categories seeded successfully.');
}
