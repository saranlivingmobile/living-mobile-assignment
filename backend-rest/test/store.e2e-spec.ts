import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StoreModule } from '../src/store/store.module';
import { StoreService } from '../src/store/store.service';
import { SequelizeModule } from '@nestjs/sequelize';


describe('StoreController (e2e)', () => {
  let app: INestApplication;
  let service: StoreService;
  beforeEach(async () => {

    const module = await Test.createTestingModule({
        imports: [
            SequelizeModule.forRoot({
                dialect: 'sqlite',
                autoLoadModels: true,
                synchronize: true,
                logging: false,
            }),
            StoreModule,
        ],
        providers: [StoreService],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    service = module.get<StoreService>(StoreService);



  });
  describe('- - Create Store - -', () => {

    it('Create Store', async () => {

        const storedata = {
            name : 'STORE - C',
            description : 'Chinese Food',
            rating : 3
        }
        return request(app.getHttpServer())
          .post('/store')
          .send(storedata)
          .expect(201)
          .then((response) => {
            console.log(expect);
            expect(response.body).toEqual(
                expect.objectContaining(storedata),
                );
            });
    
      });

  });

    describe('Find all store', () => {
        it('When there is one user, then return that store', async () => {
            const createStoresInput = {
                name: 'A',
                description: 'A',
                rating: 3,
            };
            await service.create(createStoresInput);
            return request(app.getHttpServer())
                .get('/store')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createStoresInput),
                    );
                });
        });
    });

    describe('Update store', () => {
        it('When store with valid input, then response 200 (OK) with update stores', async () => {
            const updateStoreInput = {
                name: 'John',
                description: 'Doe',
                rating: 3,
            };
            return request(app.getHttpServer())
                .put('/store/{id}')
                .send(updateStoreInput)
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                    });
        });
    });

    describe('Delete stores', () => {
        it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
            // arrange
            const DeleteID = {
                id: 'fb292dac-47b3-40e3-904d-bd419890868b'
            };
            return request(app.getHttpServer())
                .delete('/store/{id}')
                .send(DeleteID)
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                    });
            });
        });

  

    afterAll(async () => {
        await app.close();
    });
});
