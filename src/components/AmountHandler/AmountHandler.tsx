import React from 'react';
import './AmountHandler.scss';

type AmountHandlerProps = {
    add: () => void;
    remove: () => void;
    amount: number;
    blockAdd?: boolean;
}

const AmountHandler = ({
    add,
    remove,
    amount,
    blockAdd,
}: AmountHandlerProps) => (
        <div className='AmountHandler'>
            <div className="handler subtract" onClick={() => remove()}>
                <p>-</p>
            </div>
            <p>{amount}</p>
            <div className={`handler add ${blockAdd ? 'hide' : ''}`} onClick={() => add()}>
                <p>+</p>
            </div>
        </div>
    );

export default AmountHandler;