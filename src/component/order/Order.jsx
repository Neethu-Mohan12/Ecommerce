
import React, { useContext } from 'react';
import OrderContext from '../../context/orderContext/OrderContext';
import OrderList from './OrderList';

function Order() {
    const { order } = useContext(OrderContext);

    return (
        <div className='flex flex-col items-center mt-10 '>
            <h1 className='font-bold'>Order List</h1>

            <table cellSpacing={40} cellPadding={30} className='mt-14 bg-blue-300'>
                <thead className='bg-purple-300 text-white'>
                    <tr>
                        <th>Product</th>
                        <th className='pe-12'>Title</th>
                        <th className='ps-0 pe-2'>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((product) => (
                        <OrderList key={product.id} product={product}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;



