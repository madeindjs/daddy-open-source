import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly boardsService: BoardsService,
  ) {}

  @Post()
  async create(@Body() createBoardDto: CreateCardDto) {
    await this.cardsService.create(createBoardDto);
    return this.boardsService.findOne(createBoardDto.boardId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateCardDto) {
    const card = await this.cardsService.findOne(id);

    if (card === undefined) {
      throw new NotFoundException();
    }
    return this.cardsService.update(updateBoardDto);
  }

  // @Get()
  // findAll(@Request() req: Request & { user: User }) {
  //   return this.cardsService.findAll(req.user);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const card = await this.cardsService.findOne(id);

    if (card === undefined) {
      throw new NotFoundException();
    }

    await this.cardsService.remove(id);

    return this.boardsService.findOne(card.boardId);
  }
}