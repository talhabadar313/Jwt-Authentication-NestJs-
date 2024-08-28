import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly UserRepository:Repository<User>){}

  create(createUserInput: CreateUserInput) : Promise<User> {
    const user = this.UserRepository.create(createUserInput) 
     return this.UserRepository.save(user)
  }

  findAll() : Promise<User[]> {
    return this.UserRepository.find()
  }

  findOne(id: number) : Promise<User> {
    return this.UserRepository.findOneBy({id})
  }
  findOneByEmail(email: string): Promise<User> {
    return this.UserRepository.findOneBy({email});
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

 async update(id: number, updateUserInput: UpdateUserInput):Promise<User> {
    await this.UserRepository.update(id,updateUserInput)
    return this.UserRepository.findOneBy({id})
  }

 async remove(id: number) : Promise<void>{
    await this.UserRepository.delete(id)
  }
}
