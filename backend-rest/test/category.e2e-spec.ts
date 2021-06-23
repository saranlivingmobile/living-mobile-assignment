import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CategoryModule } from '../src/category/category.module';
import { CategoryService } from '../src/category/category.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModule } from '../src/store/store.module'
import { StoreService } from '../src/store/store.service'
// import { MenusModule } from '../src/menus/menus.module';
describe('CategoeyController (e2e)', () => {
    let app: INestApplication;
    let service: CategoryService;
    let serviceStore : StoreService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                CategoryModule,
                StoreModule,
                // MenusModule
            ],
            providers: [CategoryService],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        service = module.get<CategoryService>(CategoryService);
        serviceStore = module.get<StoreService>(StoreService);
    });
    describe('Find all store', () => {
        it('When there is one user, then return that store', async () => {
            const createStore ={
                name: 'Aaaaaaa',
                description: 'Aaaaaa',
                rating: 3,
            }
            const text = await serviceStore.create(createStore);
            const createStoresInput = {
                name: 'Aaaaaa',
                storeId: text.id,
            };
            await service.create(createStoresInput);
            return request(app.getHttpServer())
                .get('/category')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createStoresInput),
                    );
                });
        });
    });
    describe('Create stores', () => {
        it('When store with valid input, then response 200 (OK) with created stores', async () => {
            // arrange
            const createStore ={
                name: 'Aaaaaaa',
                description: 'Aaaaaa',
                rating: 3,
            }
            const text = await serviceStore.create(createStore);
            const createStoresInput = {
                name: 'Aaaaaa',
                storeId: text.id,
            };
            return request(app.getHttpServer())
                .post('/category')
                .send(createStoresInput)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining(createStoresInput),
                        );
                    });
            });
        });
        describe('Update stores', () => {
            it('When store with valid input, then response 200 (OK) with update stores', async () => {
                const createStore ={
                    name: 'Aaaaaaa',
                    description: 'Aaaaaa',
                    rating: 3,
                }
                const text = await serviceStore.create(createStore);
                const updateStoreInput = {
                    name: 'Aaaaaa',
                    storeId: text.id,
                };
                return request(app.getHttpServer())
                    .put('/category/{id}')
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
                    id: '297e3e67-baf0-4763-ac0e-d150fdb0cd43'
                };
                return request(app.getHttpServer())
                    .delete('/category/{id}')
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