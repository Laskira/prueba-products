"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Payment from "./payment";

export default function Home() {
  const products = [
    {
      id: 1,
      description: "Product 1 Description",
      price: 100,
      stock: 10,
      image: "prueba.com",
    },
    {
      id: 2,
      description: "Product 2 Description",
      price: 150,
      stock: 5,
      image: "prueba.com",
    },
    {
      id: 3,
      description: "Product 3 Description",
      price: 200,
      stock: 2,
      image: "prueba.com",
    },
  ];

  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const addToCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    console.log(cart)
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowPaymentModal(false);
  };

  return (
    <main className="flex flex-col h-screen bg-slate-50">
      <nav className="bg-blue-600 border-gray-200 px-6 shadow-md">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl ">
            <Link href="/" className=" py-2 ">
              <span className="block px-4 text-white font-semibold">
                Market
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-wrap items-start w-full h-full overflow-x-auto p-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded bg-gray-200 w-full sm:w-60 p-2 mr-3 mb-3 flex-shrink-0 cursor-pointer "
          >
            <h3 className="text-base text-center font-bold ml-2">
              {product.description}
            </h3>
            <div className="p-2">
              <Image
                className="w-20 mx-auto "
                src="/carro-vacio.png"
                alt={product.description}
                width={20}
                height={20}
              />
            </div>
            <div className="text-sm text-center">
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>In Cart: {cart[product.id] || 0}</p>
            </div>

            <div className="w-full text-center ">
              <div className="pb-2">
                <button
                  className="px-5 py-2 font-medium rounded text-sm focus:ring-4 bg-blue-600 text-white hover:bg-blue-500"
                  onClick={() => addToCart(product.id)}
                  disabled={cart[product.id] >= product.stock}
                >
                  Add to Cart
                </button>
                <button
                  className="px-5 py-2 font-medium rounded text-sm focus:ring-4 bg-red-600 text-white hover:bg-red-500 ml-2"
                  onClick={() => removeFromCart(product.id)}
                  disabled={!cart[product.id]}
                >
                  Remove
                </button>
              </div>
              <button
                className="px-5 py-2 font-medium rounded text-sm focus:ring-4 bg-green-600 text-white hover:bg-green-500 ml-2 disabled:bg-green-300"
                onClick={() => handleBuyNow(product)}
                disabled={!cart[product.id] || cart[product.id] === 0}

              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPaymentModal && selectedProduct && (
        <Payment
          product={selectedProduct}
          totalPrice={calculateTotalPrice()}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
