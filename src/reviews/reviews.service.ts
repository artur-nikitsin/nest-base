import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private usersService: UsersService,
  ) {}

  getAll() {
    return this.reviewsRepository.find();
  }

  getOne(id: string) {
    return this.reviewsRepository.findOne(id);
  }

  async create(createReviewDto: CreateReviewDto) {
    const newReview = new Review();
    const { review, forUser, author } = createReviewDto;
    const user = await this.usersService.getOne(forUser);

    newReview.userName = user.userName;
    newReview.review = review;
    newReview.date = new Date();
    newReview.forUser = await this.usersService.getOne(forUser);
    newReview.author = await this.usersService.getOne(author);

    return this.reviewsRepository.save(newReview);
  }

  /*async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = new User();
    const { userName, password, email, firstName, lastName } = updateUserDto;

    user.userName = userName;
    user.password = password;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    return this.reviewsRepository.update(id, user);
  }*/

  delete(id: string) {
    return this.reviewsRepository.delete(id);
  }
}
