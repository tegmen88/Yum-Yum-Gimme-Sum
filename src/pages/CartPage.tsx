
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import {RootState} from "../store/store.ts";

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    return (
        <div>
            <h1>Din varukorg</h1>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <button onClick={() => dispatch(removeFromCart(item.id))}>
                            Ta bort
                        </button>
                    </div>
                ))
            ) : (
                <p>Varukorgen är tom.</p>
            )}
        </div>
    );
};

export default CartPage;
