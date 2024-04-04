
import React from 'react';

function OrderList({ product }) {
    console.log('Product Data:', product);
    return (
        <tr className="border-b">
            <td className="p-2">
                <img src={product.images[0]} alt="" className="max-w-full max-h-full h-[100px] w-[180px]" />
            </td>
            <td className="p-2">{product.title}</td>
            <td className="p-2">{product.quantity}</td>
            <td className="p-2">${product.price.toFixed(2)}</td>
        </tr>
    );
}

export default OrderList;
