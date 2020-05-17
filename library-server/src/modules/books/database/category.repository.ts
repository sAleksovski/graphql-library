import { EntityRepository, In, Repository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findOrCreateByName(names: string[]): Promise<Category[]> {
    let found: Category[] = await this.find({
      name: In(names),
    });

    const missing: string[] = names.filter((name: string) => !found.find((cat: Category) => cat.name === name));

    if (missing.length > 0) {
      const toBeSaved = missing.map((name: string) => {
        const c = new Category();
        c.name = name;
        return c;
      });

      const saved = await this.save(toBeSaved);

      found = [...found, ...saved];
    }

    return found;
  }
}
