import React, {Component} from 'react';
import Order from "../../components/Order/Order"
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];

        for(let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }

        this.setState({orders: fetchedOrders, loading: false})
      })
      .catch(e => {
        this.setState({loading:false});
        console.log(e.message);
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);