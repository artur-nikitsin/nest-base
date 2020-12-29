import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}
  @Get()
  getAll() {
    return this.reviewsService.getAll();
  }

  @Get(':id')
  getOne(id: string) {
    return this.reviewsService.getOne(id);
  }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  /*@Put(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return this.reviewsService.update(id, updateUserDto);
  }*/

  @Delete(':id')
  delete(id: string) {
    return this.reviewsService.delete(id);
  }
}
