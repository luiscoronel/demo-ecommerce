import {
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Res,
  HttpStatus,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({name: 'limit', required: false })
  getUsers(@Query('page') page: string = '1', @Query('limit') limit: string = '5') {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.usersService.getAllUsers(Number(page), Number(limit));
  }
  
  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found!`);
    }
    return user;
  }
  
  @Get('email')
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation( { summary: 'Update user' } )
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updateUserId = await this.usersService.updateUser(id, user);
      if (!updateUserId === null) {
        throw new NotFoundException(`User ${id} not found!`);
      }
      res.status(HttpStatus.OK).json({ id: updateUserId });
    } catch (error) {
      throw new BadRequestException(error.menssage);
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string,
@Res() res: Response)
  {
    try {
      const deleteUser = this.usersService.deleteUser(id);
      if (deleteUser === null) {
        throw new NotFoundException('User not found');
      }
      res.status(HttpStatus.OK).json(`User uccessfully removed`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
