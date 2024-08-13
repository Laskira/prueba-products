import { useRouter } from "next/router";
import Link from "next/link";

export default function Status() {
  const router = useRouter();
  const { status } = router.query;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
      <p>
        Your transaction was {status === "APPROVED" ? "successful" : "unsuccessful"}.
      </p>
      <Link href="/">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Back to Products
        </button>
      </Link>
    </main>
  );
}
