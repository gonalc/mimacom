import React, { useState, useEffect } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateProduct } from '../../../data';
import { IProduct } from '../../../models/product';
import './ProductCard.scss';
import AmountHandler from '../../../components/AmountHandler/AmountHandler';

type ProductCardProps = {
    product: IProduct;
    add: (product: IProduct) => void;
    remove: (product: IProduct) => void;
    cartAmount?: number;
}

const ProductCard = ({
    product,
    add,
    remove,
    cartAmount,
}: ProductCardProps) => {
    const [isFav, setIsFav] = useState<number | string>();

    const toggleFav = async () => {
        let toggle;
        if (product.favorite) toggle = 0;
        else toggle = '1';
        setIsFav(toggle);
        await updateProduct(product.id, { favorite: toggle });
    };

    useEffect(() => {
        setIsFav(product.favorite);
    }, []);

    return (
        <div className='ProductCard'>
            <div className="img-container">
                <div className="price-container">
                    <p className='bold'>{product.price}$</p>
                </div>
                <img src={product.image_url} alt={product.productName} />
            </div>
            <div className="bottom-section">
                <p className='product-name text-normal'>{product.productName}</p>
                <p className="product-description text-small">{`${product.productDescription.slice(0, 40)}...`}</p>
                <div className="row">
                    <p className="text-normal">{product.stock} left</p>
                    <div className={`fav ${isFav ? 'favorite' : 'no-favorite'}`} onClick={() => toggleFav()}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                <div className="buy-button-container">
                    {cartAmount! > 0 ? (
                        <AmountHandler
                            add={() => add(product)}
                            amount={cartAmount!}
                            remove={() => remove(product)}
                            blockAdd={cartAmount! === product.stock}
                        />
                    ) : (
                        <button
                            onClick={() => add(product)}
                            disabled={product.stock === 0}
                            className={product.stock === 0 ? 'disabled' : ''}
                        >
                            {product.stock === 0  ? 'Not available' : 'Buy'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;