import { Body, Controller, Get, Post , Put , Delete , Param } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';
import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { StoreDto } from './dto/store.dto';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    @ApiOperation({ summary: 'Create store' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The store has been successfully created.',
        type: StoreDto,
    })
    async create(@Body() createStoreDto: CreateStoreDto) {
        const store = await this.storeService.create(createStoreDto);
        // this will map Store model value to StoreDto model value.
        return plainToClass(StoreDto, store, { excludeExtraneousValues: true });
    }

    @Get()
    @ApiOperation({ summary: 'Find all store' })
    @ApiOkResponse({ // HTTP 200
        description: 'All of store',
        isArray: true,
        type: StoreDto,
    })
    async findAll() {
        const store = await this.storeService.findAll();
        return store.map((store) =>
            plainToClass(StoreDto, store, { excludeExtraneousValues: true }),
        );
    }

    @Get('/find/:id')
     @ApiOperation({ summary: 'Find one of store' })
     @ApiOperation({
         description: 'Find of store',
      })
      async Find(@Param('id') id : string) {
         return this.storeService.find(id);
     }
     @Put(':id')
     @ApiOperation({ summary: 'Update of store' })
     @ApiOperation({
         description: 'Update of store',
      })
      async Update(@Param('id') id: string, @Body() store: CreateStoreDto ){
         return this.storeService.Update(id,store);
         // return this.storeService.findAll();
     }
     @Delete(':id')
     @ApiOperation({ summary: 'delete of store' })
     @ApiOperation({
         description: 'Delete of store',
      })
      async Delete(@Param('id') id : string) {
         return this.storeService.Delete(id);
     }
}