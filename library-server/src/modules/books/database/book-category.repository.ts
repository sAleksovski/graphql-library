import { EntityRepository, In, Repository } from 'typeorm';
import { BookCategory } from './book-category.entity';

@EntityRepository(BookCategory)
export class CategoryRepository extends Repository<BookCategory> {
  async findOrCreateByName(names: string[]): Promise<BookCategory[]> {
    let found: BookCategory[] = await this.find({
      name: In(names),
    });

    const missing: string[] = names.filter((name: string) => !found.find((cat: BookCategory) => cat.name === name));

    if (missing.length > 0) {
      const toBeSaved = missing.map((name: string) => {
        const c = new BookCategory();
        c.name = name;
        return c;
      });

      const saved = await this.save(toBeSaved);

      found = [...found, ...saved];
    }

    return found;
  }
}
