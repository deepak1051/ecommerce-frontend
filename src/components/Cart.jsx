import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  decrementCart,
  incrementCart,
  resetCart,
  removeCart,
  getTotals,
} from '../store';
import PayButton from './stripe/PayButton';

const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetCart());
  };
  const handleIncrementCart = (product) => {
    dispatch(incrementCart(product));
  };
  const handleDecrementCart = (product) => {
    dispatch(decrementCart(product));
  };
  const handleCartRemove = (product) => {
    dispatch(removeCart(product));
  };
  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [dispatch]);
  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 && (
        <p>
          Your cart is empty click <Link to="/">Here</Link>
        </p>
      )}
      <div>
        <Link to="/">&#x2190; Continue Shopping</Link>
      </div>
      <div>
        {cartItems.map((product) => (
          <div key={product.id} className="cart_single">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleCartRemove(product)}
            >
              Remove
            </button>
            <div>
              <button onClick={() => handleDecrementCart(product)}>-</button>
              <span>{product.cartQuantity}</span>
              <button onClick={() => handleIncrementCart(product)}>+</button>
            </div>
            <h6 style={{ paddingRight: '1rem' }}>
              total:${(product.price * product.cartQuantity).toFixed(2)}
            </h6>
          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            <div className="cart-total">
              <button onClick={handleReset}>Clear Cart</button>
              <div>
                <span>Subtotal</span>
                <strong>${cartTotalAmount.toFixed(2)}</strong>
              </div>
            </div>
          </>
        )}

        {cartItems.length > 0 && (
          <div style={{ textAlign: 'end' }}>
            <p>Taxes and shipping charge calculated at checkout page</p>
            {token ? (
              <PayButton cartItems={cartItems} />
            ) : (
              <Button variant="warning">
                <Link
                  to="/login"
                  style={{ color: 'white', fontWeight: 'bold' }}
                  className="imp-link"
                >
                  Login To Checkout
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
