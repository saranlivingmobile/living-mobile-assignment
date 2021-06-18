import { Body, Controller, Get, Post , Put , Delete , Param } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    @ApiOperation({ summary: 'Create store' })
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all store' })
    findAll() {
        return this.storeService.findAll();
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