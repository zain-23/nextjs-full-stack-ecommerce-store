"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getOrderStatus = async ({ orderId }: { orderId: string }) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
      throw new Error("You need to be log in to view this page");
    }

    const order = await db.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        User: true,
        billingAddress: true,
        configuration: true,
        shippingAddress: true,
      },
    });

    if (!order) {
      throw new Error("This order does't exist");
    }

    if (order.isPaid) {
      return order;
    } else {
      return false;
    }
  } catch (error) {}
};
