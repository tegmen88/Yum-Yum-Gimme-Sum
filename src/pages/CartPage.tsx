import '../styles/cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart } from '../store/cartSlice';
import { RootState } from "../store/store.ts";

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items);

    // Beräkna totalpriset
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className='cart-container'>
            <h1 className='test'>Din varukorg</h1>

            {cart.length > 0 ? (
                <div className='cart-container'>
                    {cart.map((item) => (
                        <div key={item.id}>
                            <h2>{item.name}</h2>
                            <p>Pris: {item.price} kr</p>
                            <p>Kvantitet: {item.quantity}</p>

                            {/* Öka kvantitet */}
                            <button onClick={() => dispatch(addToCart({ id: item.id, name: '', price: 0, quantity: 1 }))}>
                                Öka
                            </button>

                            {/* Minska kvantitet */}
                            <button onClick={() => dispatch(removeFromCart({ id: item.id, quantity: 1 }))}>
                                Minska
                            </button>

                            {/* Ta bort artikel */}
                            <button onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                Ta bort
                            </button>
                        </div>
                    ))}
                    {/* Visa totala priset */}
                    <h2>Totalt pris: {totalPrice} kr</h2>
                </div>
            ) : (
                <p>Varukorgen är tom.</p>
            )}
        </div>
    );
};

export default CartPage;