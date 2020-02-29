import React, { useState, useEffect } from "react";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";

const Orders = props => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrder = [];
        for (let key in res.data) {
          fetchedOrder.push({
            ...res.data[key],
            id: key
          });
        }
        setOrders(fetchedOrder);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
