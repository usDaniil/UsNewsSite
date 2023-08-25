import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/db/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
  ) {}
}
