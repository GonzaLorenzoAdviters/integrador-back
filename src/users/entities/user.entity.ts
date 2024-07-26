import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateCreator } from '../../common/DateCreator';

@Entity('user')
export class User extends DateCreator {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    username: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @ManyToOne(() => Role, (role) => role.user)
    role: Role;
}
