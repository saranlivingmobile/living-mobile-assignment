import { Body, Controller, Get, Post , Put , Delete , Param} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create Category' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all category' })
    findAll() {
        return this.categoryService.findAll();
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