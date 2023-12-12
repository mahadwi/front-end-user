"use client";
import React, { useState, useEffect } from 'react';
import fetchWithTokenClient from '@/lib/fetchWithTokenClient';
import { getCookie } from "cookies-next";
import { baseUrl } from '@/lib/constant';
import { FaTrash } from "react-icons/fa6";
import Link from "next/link"
import Select from './select';

const TableProduct = ({ cartP }) => {
  const token = getCookie(`accessToken`);
  const [cartProduct, setCartProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cart, setCart] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState('');

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(`${baseUrl}/api/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCartProduct(data.data.cart_product);
        calculateSubTotal(data.data.cart_product);
        setCart(data.data.id)

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchCart();
  }, [token]);

  const calculateSubTotal = (cartProduct) => {
    let total = 0;

    cartProduct.forEach((item) => {
      total += item.price * item.quantity;
    });

    setSubTotal(total);
  };

  const handleIncrement = async (cartItemId) => {
    try {
      setCartProduct((prevCartProduct) => {
        const updatedCart = prevCartProduct.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        calculateSubTotal(updatedCart);
        return updatedCart;
      });

      // Update the quantity on the backend
      await updateQuantity(cartItemId, cartProduct.find(item => item.id === cartItemId).quantity + 1);
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async (cartItemId) => {
    try {
      setCartProduct((prevCartProduct) => {
        const updatedCart = prevCartProduct.map(item =>
          item.id === cartItemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        calculateSubTotal(updatedCart);
        return updatedCart;
      });

      // Update the quantity on the backend
      await updateQuantity(cartItemId, cartProduct.find(item => item.id === cartItemId).quantity - 1);
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(`${baseUrl}/api/cartproduct/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity on the backend');
      }
    } catch (error) {
      console.error('Error updating quantity on the backend:', error);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      const response = await fetch(`${baseUrl}/api/cartproduct/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart product');
      }

      const updatedCart = cartProduct.filter(item => item.id !== cartItemId);
      setCartProduct(updatedCart);

      calculateSubTotal(updatedCart);
    } catch (error) {
      console.error('Error deleting cart product:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Shipping
  const handleShippingOptionChange = (selectedOption) => {
    setSelectedShippingOption(selectedOption.toLowerCase());
  };

  const courier = selectedShippingOption

  useEffect(() => {
    async function fetchShipping() {
      try {
        const response = await fetch(`${baseUrl}/api/shipping/${cart}?courier=${courier}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await response.json();

        setShippingFee(data.data);

      } catch (error) {
        console.error('Error fetching fee:', error);
      }
    }

    fetchShipping();
  }, [token, cart, courier]);

  // console.log(`cart: ${cart}`)
  // console.log(`selectedShippingOption: ${selectedShippingOption}`)
  // console.log(`shippingFee: ${shippingFee}`)
  const totalBelanja = shippingFee + subTotal;

  const addOrder = async () => {

    try {
      const response = await fetch(`${baseUrl}/api/order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart_id: cart,
          shippingCost: shippingFee,
          productPrice: subTotal
        }),
      });

      // console.log(response.headers)
      // console.log(response.headers.authorization)

      const data = response.ok ? await response.json() : {};

      if (response.ok) {
        toast.success(data.message);

        // {cartProduct.length > 0 && cartProduct.map(cartP => (
        //   fetch(`${baseUrl}/api/cartproduct/${cartP.id}`, {
        //     method: "DELETE",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        // ))}
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="flex flex- gap-0 mx-20">
      <div className="basis-3/4">
        <table className="w-full m-6 border-gray-300 border-l-0 border-r-0 border-t-0">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartProduct.length > 0 && cartProduct.map(cartP => (
              <tr key={cartP.id}>
                <td className="border-b justify-center">
                  <div className="flex flex-row items-center ">
                    <div className="ml-3">
                      <div className="font-bold">{cartP.product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2 border-b text-center">
                  Rp{" "}
                  {cartP.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="py-2 border-b text-center">
                  <button
                    id="decrement"
                    onClick={() => handleDecrement(cartP.id)}
                    className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-l"
                  >
                    -
                  </button>
                  <label> {cartP.quantity} </label>
                  <button
                    id="increment"
                    onClick={() => handleIncrement(cartP.id)}
                    className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-r"
                  >
                    +
                  </button>
                </td>
                <td className="py-2 border-b text-center">
                  <button
                    onClick={toggleEditMode}
                    className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-primary text-white rounded-l"
                  >
                    {editMode ? "Done" : "Ubah"}
                  </button>
                  {editMode && (
                    <button
                      onClick={() => handleDelete(cartP.id)}
                      className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-red-600 text-white rounded-r"
                    >
                      <FaTrash size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="divider w-full m-6" />
        <div className="w-full mx-6 mt-4 mb-12">
          <Select
            title="Shipping Method"
            disableSelected="Choose Shipping"
            options={["Jne", "Tiki", "POS"]}
            onChange={handleShippingOptionChange}
          />
        </div>
      </div>
      <div className="basis-1/4">
          <div className="flex justify-center p-6 mx-6 ">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-3">Shopping Summary</h2>
                <div className="flow-root mb-3">
                  <div>
                    <div className="flow-root">
                      <p className="float-left">Price</p>
                      <p className="float-right">
                        Rp{" "}
                        {subTotal.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                    <div className="border-b">
                      <div className="flow-root">
                        <p className="float-left">Shipping Price</p>
                        <p className="float-right">
                          {shippingFee !== undefined && shippingFee !== 0
                            ? shippingFee.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="float-left">Shopping Price</p>
                      <p className="float-right">
                        Rp{" "}
                        {totalBelanja.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end">
                <Link href="/payment">
                  <button
                    className="btn btn-primary text-white"
                    onClick={addOrder}
                  >
                    Lanjut Pembayaran
                  </button>
                </Link>
              </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default TableProduct;
