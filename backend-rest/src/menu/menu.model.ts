import { Column, Model, Table ,DataType } from 'sequelize-typescript';

@Table({
    tableName: 'menu',
})
export class MenuModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;

    @Column
    categoryId: string;

    @Column
    name : string;

    @Column
    price: number;
}