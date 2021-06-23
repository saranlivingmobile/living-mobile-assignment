import { Body, Controller, Get, Post , Put , Delete , Param} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create Category' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The category has been successfully created.',
        type: CategoryDto,
    })
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryService.create(createCategoryDto);
        // this will map User model value to UserDto model value.
        return plainToClass(CategoryDto, category, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Find all category' })
    @ApiOkResponse({ // HTTP 200
        description: 'All of category',
        isArray: true,
        type: CategoryDto,
    })
    async findAll() {
        const category = await this.categoryService.findAll();
        return category.map((category) =>
            plainToClass(CategoryDto, category, { excludeExtraneousValues: true }),
        );
    }

    @Get('/find/:id')
     @ApiOperation({ summary: 'Find one of store' })
     @ApiOperation({
         description: 'Find of store',
      })
      async Find(@Param('id') id : string) {
         return this.categoryService.find(id);
     }
     @Put(':id')
     @ApiOperation({ summary: 'Update of store' })
     @ApiOperation({
         description: 'Update of store',
      })
      async Update(@Param('id') id: string, @Body() store: CreateCategoryDto ){
         return this.categoryService.Update(id,store);
         // return this.storeService.findAll();
     }
     @Delete(':id')
     @ApiOperation({ summary: 'delete of store' })
     @ApiOperation({
         description: 'Delete of store',
      })
      async Delete(@Param('id') id : string) {
         return this.categoryService.Delete(id);
     }
}