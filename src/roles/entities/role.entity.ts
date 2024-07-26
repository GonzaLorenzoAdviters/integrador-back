import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateCreator } from '../../common/DateCreator';

@Entity('role')
export class Role extends DateCreator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @OneToMany(() => User, (user) => user.role)
    user: User;
}
