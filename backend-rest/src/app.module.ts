import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModule } from './store/store.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'AssignmentAPI',
      autoLoadModels: true,
      synchronize: true,
      }),
    StoreModule,
    CategoryModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
