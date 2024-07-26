import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORM = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: '0.0.0.0',
    port: 5434,
    username: 'postgres',
    password: 'bootcamp062024',
    database: 'postgres',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  };
};
