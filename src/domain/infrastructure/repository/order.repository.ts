import Order from "../../checkout/entity/order";
import OrderItem from "../../checkout/entity/order_item";
import OrderRepositoryInterface from "../../checkout/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
    {
      total: entity.total(),
    },
    {where :
        {
            id: entity.id        
        }
    },
    );
    for (const item of entity.items) {
      await OrderItemModel.update(
        {
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,          
        },
        {where :
          {
              id: item.id        
          }
      },
      );
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne(
      {where: {id},
      include: ["items"]}
      );
      const orderItems: OrderItem[] = orderModel.items.map((item: any) => {
        return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
        )
      });

      return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderItems
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({include: ["items"]});

    return orderModels.map((orderModel) => {
 
      const orderItems: OrderItem[] = orderModel.items.map((item: any) => {
        return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
        )
      });
  
      return  new Order(
          orderModel.id,
          orderModel.customer_id,
          orderItems
        )});  
}
  
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}