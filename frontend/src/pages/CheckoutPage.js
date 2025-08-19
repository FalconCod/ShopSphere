import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment

  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const ORDERS_URL = 'http://localhost:5004'; // Direct orders service

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to payment selection
  };

  const handleCODPayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Debug: Check user object
      console.log('User object:', user);
      console.log('User ID:', user?.id);
      
      if (!user || !user.id) {
        throw new Error('User not logged in');
      }

      const totalAmount = getCartTotal() * 1.18; // Including 18% tax

      const orderData = {
        userId: user.id,
        items: cart.items,
        totalAmount,
        shippingAddress,
        paymentMethod: 'COD'
      };

      console.log('Order data being sent:', orderData);

      // Create order with COD payment method
      const orderResponse = await axios.post(`${ORDERS_URL}/api/orders/create-cod`, orderData);

      // Clear cart
      await clearCart();
      
      // Navigate to orders page with success message
      navigate('/orders', { 
        state: { 
          orderSuccess: true, 
          orderId: orderResponse.data.order._id,
          message: 'Order placed successfully! You will pay cash on delivery.' 
        } 
      });
    } catch (error) {
      console.error('COD order error:', error);
      setError(error.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePayment = () => {
    alert('💳 Online Payment feature is coming soon! 🚀\n\nFor now, please select Cash on Delivery option.');
  };

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const totalAmount = getCartTotal();
  const taxAmount = totalAmount * 0.18;
  const finalAmount = totalAmount + taxAmount;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}>
            1
          </div>
          <span className="ml-2 font-medium">Shipping Address</span>
        </div>
        <div className="w-16 h-1 bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}>
            2
          </div>
          <span className="ml-2 font-medium">Payment Method</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Continue to Payment
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Cash on Delivery Option */}
                <div 
                  className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => setPaymentMethod('COD')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="cod" className="ml-3 cursor-pointer">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💵</span>
                        <div>
                          <div className="font-semibold">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when your order arrives</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Online Payment Option */}
                <div 
                  className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => setPaymentMethod('ONLINE')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === 'ONLINE'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="online" className="ml-3 cursor-pointer">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💳</span>
                        <div>
                          <div className="font-semibold">Online Payment</div>
                          <div className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</div>
                          <div className="text-xs text-orange-600 font-medium">🚀 Coming Soon!</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {paymentMethod === 'COD' && (
                  <button
                    onClick={handleCODPayment}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? 'Placing Order...' : `Place Order - ₹${finalAmount.toFixed(2)}`}
                  </button>
                )}

                {paymentMethod === 'ONLINE' && (
                  <button
                    onClick={handleOnlinePayment}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Pay Online - ₹{finalAmount.toFixed(2)}
                  </button>
                )}

                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Back to Shipping Address
                </button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Address Summary (in step 2) */}
          {step === 2 && (
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-semibold mb-2">Shipping To:</h3>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{shippingAddress.name}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                <p>📞 {shippingAddress.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;