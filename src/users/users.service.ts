import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../common/utils/hashPassword.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>){}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.findOne({where:{email:createUserDto.email}})

    if(user) throw new BadRequestException("Ya existe el usuario")

    createUserDto.password = hashPassword(createUserDto.password);
    return this.userRepository.save(createUserDto);
  }
  
  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({where:{id:id}})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id:id}, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.softDelete({id:id})
  }
}
