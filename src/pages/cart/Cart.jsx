import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/firebaseConfig';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmout, setTotalAmount] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const shipping = 100;
  const grandTotal = totalAmout + shipping;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp += parseInt(item.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Item removed from cart');
  };

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error('All fields are required', { position: 'top-center' });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      grandTotal,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      email: JSON.parse(localStorage.getItem('user')).user.email,
      userid: JSON.parse(localStorage.getItem('user')).user.uid,
      paymentMethod: 'Bkash (manual)',
    };

    try {
      const orderRef = collection(fireDB, 'order');
      await addDoc(orderRef, orderInfo);
      toast.success('Order placed successfully!');
      cartItems.forEach((item) => dispatch(deleteFromCart(item)));
      setName('');
      setAddress('');
      setPincode('');
      setPhoneNumber('');
    } catch (error) {
      toast.error('Something went wrong while placing order');
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-100 pt-5 pb-10 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : '',
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item;
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-between rounded-lg border drop-shadow-xl bg-white p-4 sm:p-6 gap-4"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="product"
                    className="w-full sm:w-32 md:w-40 rounded-lg"
                  />
                  <div className="flex-1 sm:ml-4 w-full">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-sm">{description}</p>
                    <p className="mt-1 text-sm font-semibold">৳{price}</p>
                  </div>
                  <div
                    onClick={() => deleteCart(item)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Modal */}
          <div
            className="w-full lg:w-1/3 rounded-lg border bg-white p-6 shadow-md"
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
              color: mode === 'dark' ? 'white' : '',
            }}
          >
            <div className="mb-4 flex justify-between">
              <p>Subtotal</p>
              <p>৳{totalAmout}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Shipping</p>
              <p>৳{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-6">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">৳{grandTotal}</p>
            </div>

            {/* Modal for checkout form */}
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
