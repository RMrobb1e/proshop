import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import AdminRoute from './components/AdminRoute.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import OrderListScreen from './screens/admin/OrderListScreen.tsx';
import CartScreen from './screens/CartScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import OrderScreen from './screens/OrderScreen.tsx';
import PaymentScreen from './screens/PaymentScreen.tsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.tsx';
import ProductScreen from './screens/ProductScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import ShippingScreen from './screens/ShippingScreen.tsx';

import store from './store.ts';

import './assets/bootstrap.custom.css';
import './assets/index.css';
import ProductListScreen from './screens/admin/ProductListScreen.tsx';
import ProductsEditScreen from './screens/admin/ProductsEditScreen.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/place-order" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/order-list" element={<OrderListScreen />} />
        <Route path="/admin/product-list" element={<ProductListScreen />} />
        <Route
          path="/admin/product/:id/edit"
          element={<ProductsEditScreen />}
        />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading options={{ clientId: '' }}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
