import React from "react";
import { useRouter } from "next/router";

export default function Summary({
  product,
  totalPrice,
  deliveryAddress,
  creditCard,
  cardType,
}: {
  product: any;
  totalPrice: number;
  deliveryAddress: string;
  creditCard: string;
  cardType: "VISA" | "MasterCard" | null;
}) {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      // 1. Crear una transacción pendiente en tu backend
      const response = await fetch("/api/createTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "PENDING",
          amount: totalPrice,
          product: product.description,
        }),
      });
      const transaction = await response.json();

      // 2. Llamar a la API de Wompi para completar el pago
      const paymentResponse = await fetch("https://sandbox.wompi.co/v1/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount_in_cents: totalPrice * 100,
          currency: "COP",
          payment_method: {
            type: "CARD",
            number: creditCard,
            cvc: "123", 
            exp_year: "25", 
            exp_month: "12",
          },
          customer_email: "customer@example.com",
        }),
      });
      const paymentResult = await paymentResponse.json();

      const updateResponse = await fetch(`/api/updateTransaction/${transaction.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: paymentResult.status === "APPROVED" ? "COMPLETED" : "FAILED",
          wompiTransactionId: paymentResult.id,
        }),
      });

      if (paymentResult.status === "APPROVED") {
        await fetch(`/api/assignProduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            customerId: "customer-id", 
          }),
        });

        await fetch(`/api/updateStock/${product.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: product.stock - 1,
          }),
        });
      }

      router.push(`/status?status=${paymentResult.status}`);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <div className="mb-4">
        <p><strong>Product:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
        <p><strong>Credit Card:</strong> **** **** **** {creditCard.slice(-4)}</p>
        <p><strong>Card Type:</strong> {cardType}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handlePayment}
      >
        Confirm and Proceed to Status
      </button>
    </main>
  );
}
