import React from 'react';
import AmountHandler from '../../../components/AmountHandler/AmountHandler';
import { IProduct } from '../../../models/product';
import './Item.scss';

type ItemProps = {
    product: IProduct;
    addProduct: () => void;
    removeProduct: () => void;
}

const Item = ({ product, addProduct, removeProduct }: ItemProps) => {
    return (
        <div className='Item'>
            <div className="img-container">
                <img src={product.image_url} alt={product.productName} />
            </div>
            <div className="middle-container">
                <p className='bold'>{product.productName}</p>
                <div className="amount-handler-container">
                    <AmountHandler
                        amount={product.amount!}
                        add={() => addProduct()}
                        remove={() => removeProduct()}
                        blockAdd={product.amount! === product.stock}
                    />
                </div>
            </div>
            <div className="price-container">
                <p className='bold price'>${product.price}</p>
                <hr />
                <p className="total-item-price bold">${product.price * product.amount!}</p>
            </div>
        </div>
    );
};

export default Item;