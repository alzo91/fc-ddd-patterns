import {
  DataType,
  Model,
  PrimaryKey,
  Table,
  Column,
} from "sequelize-typescript";

@Table({ tableName: "customers", timestamps: false })
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare street: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare neighborhood: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare zipcode: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare city: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare state: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare active: boolean;

  @Column({ allowNull: false, type: DataType.FLOAT })
  declare rewardPoints: number;
}
