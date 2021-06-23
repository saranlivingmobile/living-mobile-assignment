import { Column, Model, Table , DataType, ForeignKey } from 'sequelize-typescript';
import { StoreModel } from '../store/store.model';

@Table({
    tableName: 'category',
})
export class CategoryModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;

    @Column
    name: string;

    @Column({
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    @ForeignKey(()=> StoreModel)
    storeId: string;

    @HasMany(()=>MenuModel)
    menuId : MenuModel[];
}