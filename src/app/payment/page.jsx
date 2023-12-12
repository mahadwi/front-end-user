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

export default function Page() {

  const token = getCookie(`accessToken`);
  const [cartProduct, setCartProduct] = useState([]);
  const [cart, setCart] = useState(0);
  const [order, setOrder] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedPaymentMethodOption, setSelectedPaymentMethodOption] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [payment, setPayment] = useState([]);
  const [addressUser, setAddressUser] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [tokenMidtrans, setTokenMidtrans] = useState("");

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

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchCart();
  }, [token]);

  // address
  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await fetch(`${baseUrl}/api/address/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setAddressUser(data.data[0]);
        setProvinceId(data.data[0].province_id);
        setCityId(data.data[0].city_id);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
    fetchAddress();
  }, [token]);
  console.log("addressUser", addressUser);
  console.log("provinceId", provinceId);
  console.log("cityId", cityId);

  useEffect(() => {
    async function fetchProvince() {
      try {
        const response = await fetch(`${baseUrl}/api/user/province/${provinceId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setProvince(data.data.name);
      } catch (error) {
        console.error("Error fetching province:", error);
      }
    }
    fetchProvince();
  }, [provinceId, token]);
  console.log("province", province);

  useEffect(() => {
    async function fetchCity() {
      try {
        const response = await fetch(`${baseUrl}/api/user/city/${cityId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCity(data.data.name);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    }
    fetchCity();
  }, [cityId, token]);
  console.log("city", city);

  // order
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`${baseUrl}/api/order/cart/${cart}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setSubTotal(data.data.price);
        setShippingFee(data.data.shipping_price);
        setOrder(data.data.id)

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchOrder();
  }, [token, cart]);


  // const calculateSubTotal = (cartProduct) => {
  //   let total = 0;

  //   cartProduct.forEach((item) => {
  //     total += item.price * item.quantity;
  //   });

  //   setSubTotal(total);
  // };

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

  // console.log(`paymentmethod: ${paymentMethods}`)
  // console.log(`selectedPaymentMethodOption: ${selectedPaymentMethodOption}`)

  const handlePaymentMthodOptionChange = (selectedOption) => {
    setSelectedPaymentMethodOption(selectedOption);
  };

  useEffect(() => {
    async function fetchOrder() {
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

    fetchOrder();
  }, [token, cart]);

  const totalBelanja = shippingFee + subTotal;

  const handlePayment = async () => {
    const response = await fetch(`${baseUrl}/api/payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: parseInt(order),
        cart_id: parseInt(cart),
        payment_method_id: parseInt(selectedPaymentMethodOption),
        total_price: parseInt(totalBelanja),
      }),
    });
    const data = await response.json();
    console.log("data payment", data);
    setTokenMidtrans(data.token);
    console.log("token midtrans", tokenMidtrans);
    if (response.ok) {
      toast.success("Payment successful!");
    } else {
      toast.error(`${data.message}`);
      return;
    }
    // router.refresh();
    // router.push("/shipping_fee");
  };

  // const addPayment = async () => {

  //   try {
  //     const response = await fetch(`${baseUrl}/api/payment/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         order_id: order, 
  //         payment_method_id: selectedPaymentMethodOption, 
  //         cart_id: cart, 
  //         total_price: totalBelanja
  //       }),
  //     });

  //     const data = response.ok ? await response.json() : {};

  //     if (response.ok) {
  //       toast.success(data.message);

  //       // {cartProduct.length > 0 && cartProduct.map(cartP => (
  //       //   fetch(`${baseUrl}/api/cartproduct/${cartP.id}`, {
  //       //     method: "DELETE",
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //       Authorization: `Bearer ${token}`,
  //       //     },
  //       //   })
  //       // ))}

  //       useEffect(() => {
  //         async function fetchPayment() {
  //           try {
  //             const response = await fetch(`${baseUrl}/api/payment/order/${order}`, {
  //               method: "GET",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${token}`,
  //               }
  //             });
      
  //             const data = await response.json();
      
  //             setPayment(data.data);
      
  //           } catch (error) {
  //             console.error('Error fetching fee:', error);
  //           }
  //         }
      
  //         fetchPayment();
  //       }, [token, order]);
  //     } else {
  //       toast.error(`${data.error}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("An error occurred. Please try again later.");
  //   }
  // }

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    const midtransClientKey = "SB-Mid-client-RGHlGALHJ5YF5uma";
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (tokenMidtrans) {
      window.snap.pay(tokenMidtrans, {
        onSuccess: (result) => {
          toast.success("pembayaran ", JSON.stringify(result));
          setTokenMidtrans("");
        },
        onPending: (result) => {
          toast.info("pembayaran ", JSON.stringify(result));
          setTokenMidtrans("");
        },
        onError: (result) => {
          toast.error("pembayaran ", JSON.stringify(error));
          setTokenMidtrans("");
        },
        onClose: () => {
          toast.warn("Anda belum menyelesaikan pembayaran");
          setTokenMidtrans("");
        },
      });
    }
  }, [tokenMidtrans]);

  return (
    <div>
      <Title title="Check Out" />
      <div className="flex flex-row gap-0 mx-20">
        <div className="basis-3/4 mx-5">
          <div className="Address">
            <p className="font-semibold mb-5">Address</p>
            <p>
              {addressUser.address}, {city}, {province}
            </p>
            <p>Postal Code : {addressUser.postal_code}</p>
            <p>Phone : {addressUser.phone}</p>
          </div>
          <div className="divider" />
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
                {
                  selectedPaymentMethodOption == 1 
                  ? 
                    <button
                      className="btn btn-primary text-white"
                      onClick={handlePayment}
                    >
                      Check Out
                    </button>
                  : 
                    <Link href='payment/tf'>
                      <button
                        className="btn btn-primary text-white"
                      >
                        Check Out
                      </button>
                    </Link>
                }
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
