import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const ORDERS_URL = 'http://localhost:5004'; // Direct orders service
  
  // Check if we came from successful order placement
  const orderSuccess = location.state?.orderSuccess;
  const successMessage = location.state?.message;
  const orderId = location.state?.orderId;

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${ORDERS_URL}/api/orders/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">No Orders Found</h2>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {orderSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🎉</span>
              <div>
                <h3 className="font-bold text-lg">Order Placed Successfully!</h3>
                <p className="text-sm">{successMessage}</p>
                {orderId && (
                  <p className="text-xs text-green-600 mt-1">Order ID: #{orderId.slice(-8)}</p>
                )}
              </div>
            </div>
            <Link
              to="/products"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order._id.slice(-8)}</h3>
                <p className="text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-sm text-gray-500">Payment Method:</span>
                  <span className="text-sm font-medium">
                    {order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Online Payment'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.paymentStatus
                  )}`}
                >
                  Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
                {order.orderStatus && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    Order: {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-50 p-3 rounded">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                  <div className="text-lg font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Shipping Address:</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.pincode}
                  </p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
            )}

            {/* Order Total */}
            <div className="flex justify-between items-center border-t pt-4">
              <div className="text-sm text-gray-600">
                {order.items.length} item(s)
              </div>
              <div className="text-xl font-semibold">
                Total: ₹{order.totalAmount.toFixed(2)}
              </div>
            </div>

            {/* Payment Info */}
            {order.razorpayPaymentId && (
              <div className="mt-3 text-sm text-gray-600">
                Payment ID: {order.razorpayPaymentId}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
