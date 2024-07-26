import { CreateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class DateCreator{
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}