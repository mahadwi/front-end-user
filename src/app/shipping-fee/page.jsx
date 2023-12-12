"use client";

import React, { useState, useEffect } from 'react';
import fotoProduct from "@/components/assets/logo.png";
import Title from "@/components/cart/title.jsx";
import Select from "@/components/cart/select";
import SelectPaymentMethod from "@/components/cart/selectPaymentMethod";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { baseUrl } from '@/lib/constant';
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

export default function ShippingFee() {

  const token = getCookie(`accessToken`);
  const [cartProduct, setCartProduct] = useState([]);
  const [cart, setCart] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState('');
  const [selectedPaymentMethodOption, setSelectedPaymentMethodOption] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);

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

        setCart(data.data.id)
        setCartProduct(data.data.cart_product);
        calculateSubTotal(data.data.cart_product);

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

  // payment method
  useEffect(() => {
    async function fetchPaymentMethod() {
      try {
        const response = await fetch(`${baseUrl}/api/paymentmethod/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setPaymentMethods(data.data);

      } catch (error) {
        console.error('Error fetching payment method:', error);
      }
    }

    fetchPaymentMethod();
  }, [token]);

  let href = ""
  selectedPaymentMethodOption == 1 ? href = "/payment/qris" : href = "/payment/tf"

  // console.log(`paymentmethod: ${paymentMethods}`)
  // console.log(`selectedPaymentMethodOption: ${selectedPaymentMethodOption}`)

  // Shipping
  const handleShippingOptionChange = (selectedOption) => {
    setSelectedShippingOption(selectedOption.toLowerCase());
  };
  
  const handlePaymentMthodOptionChange = (selectedOption) => {
    setSelectedPaymentMethodOption(selectedOption);
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

        {cartProduct.length > 0 && cartProduct.map(cartP => (
          fetch(`${baseUrl}/api/cartproduct/${cartP.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        ))}
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <Title title="Check Out" />
      <div className="flex flex-row gap-0 mx-20">
        <div className="basis-3/4 mx-5">
          <div className="produk">
            <p className="font-semibold">Order Details</p>
            {cartProduct.length > 0 && cartProduct.map(cartP => (
            <div className="flex flex-row justify-center mt-3" jey={cartP.id}>
              <div className="w-1/3">
                {" "}
                <Image src={fotoProduct} alt="produk1" />
              </div>
              <div className="w-2/3">
                <p className="font-semibold">{cartP.product.name}</p>
                <p>
                  {cartP.quantity} x Rp{" "}
                  {cartP.price.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            </div>
            ))}
          </div>
          <div className="divider" />
          <Select
            title="Shipping Method"
            disableSelected="Choose Shipping"
            options={["Jne", "Tiki", "POS"]}
            onChange={handleShippingOptionChange}
          />
          <div className="divider" />
          <SelectPaymentMethod
            title="Payment Method"
            disableSelected="Choose Payment"
            options={paymentMethods}
            onChange={handlePaymentMthodOptionChange}
          />
          <div className="mb-10" />
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
                <Link href={href}>
                  <button
                    className="btn btn-primary text-white"
                    onClick={addOrder}
                  >
                    Check Out
                  </button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
