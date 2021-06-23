import { Body, Controller, Get, Post , Put , Delete , Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MenuDto } from './dto/menu.dto';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    @ApiOperation({ summary: 'Create menu' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The menu has been successfully created.',
        type: MenuDto,
    })
    async create(@Body() createMenuDto: CreateMenuDto) {
        const menu = await this.menuService.create(createMenuDto);
        // this will map Menu model value to MenuDto model value.
        return plainToClass(MenuDto, menu, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Find all menu' })
    @ApiOkResponse({ // HTTP 200
        description: 'All of menu',
        isArray: true,
        type: MenuDto,
    })
    async findAll() {
        const menu = await this.menuService.findAll();
        return menu.map((menu) =>
            plainToClass(MenuDto, menu, { excludeExtraneousValues: true }),
        );
    }

    @Get('/find/:id')
     @ApiOperation({ summary: 'Find one of menu' })
     @ApiOperation({
         description: 'Find of menu',
      })
      async Find(@Param('id') id : string) {
         return this.menuService.find(id);
     }
     @Put(':id')
     @ApiOperation({ summary: 'Update of menu' })
     @ApiOperation({
         description: 'Update of menu',
      })
      async Update(@Param('id') id: string, @Body() menu: CreateMenuDto ){
         return this.menuService.Update(id,menu);
         // return this.menuService.findAll();
     }
     @Delete(':id')
     @ApiOperation({ summary: 'delete of menu' })
     @ApiOperation({
         description: 'Delete of menu',
      })
      async Delete(@Param('id') id : string) {
         return this.menuService.Delete(id);
     }
}