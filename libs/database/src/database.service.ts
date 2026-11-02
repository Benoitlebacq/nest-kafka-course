import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;
  public db: ReturnType<typeof drizzle<typeof schema>>;

  constructor() {
    const connectionString =
      process.env.DATABASE_URL ||
      'postgresql://api-gateway:my_password@localhost:5432/api-gateway';

    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool, { schema });

    console.log('Database connected');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  get schema() {
    return schema;
  }
}
