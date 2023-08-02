"use client";

import { Order, WithID } from "@/types";
import Card from "./Card";

import OrderTab from "@/components/OrderTab";
import OrderModal from "@/components/modals/Order";

import { useState } from "react";

import { getOrders } from "@/data/orders";

type Props = {
  initOrders: WithID<Order>[];
};

export default function NewOrders({ initOrders }: Props) {
  const [orders, setOrders] = useState(initOrders);

  const afterDelete = () => {
    getOrders({
      offset: 0,
      limit: 7,
      filter: "processing",
      sortBy: "createdAt",
      sortedOrder: "asc",
    }).then(({ items: _orders }) => {
      setOrders(_orders);
    });
  };

  const afterUpdate = () => {
    getOrders({
      offset: 0,
      limit: 7,
      filter: "processing",
      sortBy: "createdAt",
      sortedOrder: "asc",
    }).then(({ items: _orders }) => {
      setOrders(_orders);
    });
  };

  return (
    <Card
      title="NEW ORDERS"
      button={{ link: "/orders", text: "SEE ALL ORDERS" }}
      items={orders}
      ItemTab={OrderTab}
      ItemModal={OrderModal}
      afterDelete={afterDelete}
      afterUpdate={afterUpdate}
    />
  );
}
