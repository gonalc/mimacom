import React from 'react';
import Loader from '../../components/Loader/Loader';
import { IProduct } from '../../models/product';
import './Main.scss';
import ProductCard from './ProductCard/ProductCard';

type MainProps = {
    addProduct: (product: IProduct) => void;
    cartOn?: boolean;
    removeProduct: (product: IProduct) => void;
    products: IProduct[];
    cartList: IProduct[];
}

const Main = ({
    addProduct,
    cartOn,
    removeProduct,
    products,
    cartList,
}: MainProps) => {
    return (
        <div className={`Main ${cartOn ? 'block' : ''}`}>
            {products && products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    add={(p) => addProduct(p)}
                    remove={(p) => removeProduct(p)}
                    cartAmount={cartList.find((p) => p.id === product.id)?.amount}
                />
            ))}
        </div>
    );
};

export default Main;