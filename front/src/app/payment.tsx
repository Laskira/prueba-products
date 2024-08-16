import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Payment({
  product,
  totalPrice,
  onClose,
}: {
  totalPrice: number;
  product: any;
  onClose: () => void;
}) {
  const [creditCard, setCreditCard] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cardType, setCardType] = useState<"VISA" | "MasterCard" | null>(null);
  const [loading, setLoading] = useState(false);

  const baseFee = 5000;
  const deliveryFee = 15000;

  const finalTotalPrice = totalPrice + baseFee + deliveryFee;

  const validateCardNumber = (number: string) => {
    const cleanedNumber = number.replace(/\D/g, "");
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardRegex = /^5[1-5][0-9]{14}$/;

    if (visaRegex.test(cleanedNumber)) {
      setCardType("VISA");
    } else if (masterCardRegex.test(cleanedNumber)) {
      setCardType("MasterCard");
    } else {
      setCardType(null);
    }

    setCreditCard(cleanedNumber);
  };

  const handlePayment = async () => {
    setLoading(true);

    const paymentData = {
      creditCard,
      cvc,
      expiryDate,
      deliveryAddress,
      totalAmount: finalTotalPrice,
      productId: product.id,  
    };

    try {
      const response = await axios.post('http://localhost:4000/pay', paymentData);

      console.log("Payment Response:", response.data);
      alert("Payment successful!");

      onClose();
    } catch (error) {
      console.error('Error during payment:', error);
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Complete your Payment</h2>
        <p>Product: {product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Total Price: ${totalPrice}</p>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <p>Base Fee: ${baseFee}</p>
          <p>Delivery Fee: ${deliveryFee}</p>
          <p className="font-bold">Final Total Price: ${finalTotalPrice}</p>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Credit Card Number:</label>
          <input
            type="number"
            className="border border-gray-300 rounded p-2 w-full"
            value={creditCard}
            onChange={(e) => validateCardNumber(e.target.value)}
            max="19"
          />
          {cardType && (
            <div className="mt-2">
              <Image
                src={
                  cardType === "VISA"
                    ? "/visa-logo.svg"
                    : "/mastercard-logo.svg"
                }
                alt={`${cardType} logo`}
                className="w-16 mx-auto "
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block mb-2">CVC:</label>
          <input
            type="number"
            className="border border-gray-300 rounded p-2 w-full"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            maxLength={3}
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Expiry Date (MMYY):</label>
          <input
            type="text"
            placeholder="MMYY"
            className="border border-gray-300 rounded p-2 w-full"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            maxLength={4}
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Delivery Address:</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={handlePayment}
            disabled={loading || !creditCard || !cvc || !expiryDate || !deliveryAddress || !cardType}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
