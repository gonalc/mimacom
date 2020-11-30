import React from 'react';
import { IProduct } from '../../models/product';
import { Transition } from 'react-transition-group';
import './Cart.scss';
import Item from './Item/Item';

type CartProps = {
    show: boolean;
    toggleCart: () => void;
    items: IProduct[];
    addProduct: (product: IProduct) => void;
    removeProduct: (product: IProduct) => void;
}

const Cart = ({
    show,
    toggleCart,
    items,
    addProduct,
    removeProduct,
}: CartProps) => {
    const getFinalPrice = () => {
        const price = items.reduce((acc, curr) => {
            const added = acc + curr.price * curr.amount!;
            return added;
        }, 0);
        return price;
    };

    const duration = 300;

    const defaultStyle = {
        transition: `transform ${duration}ms ease-in-out`,
    }

    const transitionStyles = {
        entering: { transform: `translateX(100vw)` },
        entered: { transform: `translateX(0)` },
        exiting: { transform: `translateX(100vw)` },
        exited: { transform: `translateX(100vw)` },
        unmounted: { transform: `translateX(100vw)` },
    };

    return (
        <>
            <Transition in={show} timeout={duration} mountOnEnter unmountOnExit>
                {(state) => (
                    <div
                        className="Cart"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        <div className="items-list">
                            {items.map((item) => (
                                <Item
                                    product={item}
                                    key={item.id}
                                    addProduct={() => addProduct(item)}
                                    removeProduct={() => removeProduct(item)}
                                />
                            ))}
                        </div>
                        {items.length > 0 ? (
                            <div className="handle-purchase">
                                <div className="total-amount-container">
                                    <p className="label">Total amount</p>
                                    <p className="total-amount bold">${getFinalPrice()}</p>
                                </div>
                                <div className="payment-button">
                                    <button className='bold text-normal btn orange'>Make a payment</button>
                                </div>
                            </div>
                        ) : (
                                <div className="no-items-message">
                                    <p>You don't have any item in your shopping cart.</p>
                                    <div className="btn-container">
                                        <button
                                            className="bold btn text-normal blue"
                                            onClick={() => toggleCart()}
                                        >
                                            See products
                                </button>
                                    </div>
                                </div>
                            )}
                    </div>
                )}
            </Transition>
            <div className='spacer' />
        </>
    );
};

export default Cart;