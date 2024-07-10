import { Column, Model, PrimaryKey, Table, DataType } from "sequelize-typescript";

@Table({
  tableName: "customer",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare street: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare zipcode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare city: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare active: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare rewardPoints: number;
}