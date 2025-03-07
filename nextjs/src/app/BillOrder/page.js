// app/BillOrder/page.js
"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from 'next/navigation';


export default function BillOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [bills, setBills] = useState([]); // State to store the list of bills

  useEffect(() => {
    const orderParam = searchParams.get('order');
    if (orderParam) {
      try {
        const decodedOrder = decodeURIComponent(orderParam);
        const parsedOrder = JSON.parse(decodedOrder);
        setOrderData(parsedOrder);
      } catch (e) {
        setError("Invalid order data received.");
        console.error("Error parsing order data:", e);
      } finally {
          setLoading(false)
      }
    } else {
        setError("No order data provided.");
        setLoading(false)
    }
  }, [searchParams]);

    // Fetch bills on component mount (for the /BillOrder route)
    useEffect(() => {
      const fetchBills = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/bills");
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          setBills(data); // Update the bills state
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
       // Only fetch bills IF orderData is not present (we're on /BillOrder)
        if (!orderData) {
            fetchBills();
        }

    }, [orderData]); // Depend on orderData


  const handleCreateBill = async () => {
    if (!orderData) return;

    try {
      // Calculate total price (same logic as in MenuOrder page)
      const totalPrice = orderData.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

       // Format the current date as a string (YYYY-MM-DD)
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

      const billData = {
        total: totalPrice, // Use the calculated total
        pay_date: formattedDate, // Or any other date string format your backend expects
        // Add user_id and giveaway_id if you have them, e.g., from a session
      };


      const billRes = await fetch("/api/bills", { // Make sure your API route is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (!billRes.ok) {
          const errorData = await billRes.json();
          throw new Error(errorData.message || "Failed to create bill");
      }
       const createdBill = await billRes.json();

        // Link Menu Item with bill
        const promises = orderData.map(async item => {
            const response = await fetch('/api/bill_items', { // You MUST create this API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bill_id: createdBill.bill_id, // Use ID from created bill
                    menu_id: item.menu_id,
                    quantity: item.quantity,
                    price: item.price
                })
            });

            if (!response.ok) {
               const errorData = await response.json(); // Read error message
               throw new Error("Failed to add menu item to bill" + errorData.message);
            }
           return response.json();
        })

        await Promise.all(promises) //wait all item be insert
        alert("Bill and Order Items created successfully!");
        // router.push('/BillOrder'); // Redirect to a bill list page or similar  //NO NEED REDIRECT
        // Instead of redirecting, clear orderData and re-fetch the bill list:
        setOrderData(null);
        // Refetch bills
        const res = await fetch("/api/bills");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const updatedBills = await res.json();
        setBills(updatedBills);



    } catch (error) {
      setError(error.message);
      console.error("Error creating bill:", error);
       alert("Error creating bill." + error.message);
    }
  };


  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    );
  }
    const totalPrice = orderData ? orderData.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;

return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bill Orders</h1>

        {/* Conditionally render based on orderData */}
        {orderData ? (
            <>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Menu Item</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderData.map((item) => (
                            <TableRow key={item.menu_id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {item.menu_type} {item.type ? `(${item.type})` : ""}
                                </TableCell>
                                <TableCell>{item.price.toFixed(2)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 <div className="mt-4">
                    <p className="text-lg font-bold">Total Price: {totalPrice.toFixed(2)}</p>
                </div>

                <div className="mt-4">
                    <Button onClick={handleCreateBill} variant="default">
                        Create Bill
                    </Button>
                </div>
            </>
        ) : (
            // Display existing bills if no order data
           <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Pay Date</TableHead>
                        <TableHead>User ID</TableHead>
                         <TableHead>Giveaway ID</TableHead>
                        {/* <TableHead>Actions</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bills.map((bill) => (
                        <TableRow key={bill.bill_id}>
                            <TableCell>{bill.bill_id}</TableCell>
                            <TableCell>{bill.total}</TableCell>
                            <TableCell>{bill.pay_date}</TableCell> {/* Format this date */}
                            <TableCell>{bill.user_id || "N/A"}</TableCell>
                            <TableCell>{bill.giveaway_id || "N/A"}</TableCell>
                            {/* <TableCell>
                <Link href={`/BillOrder/${bill.bill_id}`}>
                    <Button variant="outline" size="sm">
                      View/Edit
                    </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => onDelete(bill.bill_id)}
                >
                  Delete
                </Button>
              </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        )}
    </div>
);

}