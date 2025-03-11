"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";


// Function to get a cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function BillOrderPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [giveAways, setGiveAways] = useState([]);
  const [selectedGiveAway, setSelectedGiveAway] = useState(null);
  const [giveAwayLoading, setGiveAwayLoading] = useState(false);


  useEffect(() => {
    const orderParam = searchParams.get("order");
    if (orderParam) {
      try {
        const decodedOrder = decodeURIComponent(orderParam);
        const parsedOrder = JSON.parse(decodedOrder);
        setOrderData(parsedOrder);
      } catch (e) {
        setError("Invalid order data received.");
        console.error("Error parsing order data:", e);
      } finally {
        setLoading(false);
      }
    } else {
      setError("No order data provided.");
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchGiveAways = async () => {
      if (orderData) {
        const totalPrice = orderData.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        if (totalPrice >= 60) {
          setGiveAwayLoading(true);
          try {
             const giveAwayRes = await fetch(`http://localhost:8080/giveAway`, {
                 credentials: "include",
             });

            if (!giveAwayRes.ok) {
              throw new Error(`HTTP error! status: ${giveAwayRes.status}`);
            }
            const giveAwayData = await giveAwayRes.json();
            setGiveAways(giveAwayData);
          } catch (error) {
            setError("Failed to fetch give-aways: " + error.message);
          } finally {
            setGiveAwayLoading(false);
          }
        }
      }
    };

    fetchGiveAways();
  }, [orderData]);


  const handleCreateBill = async () => {
    if (!orderData) return;

    try {
      const orders = orderData.map((item) => ({
        menu_id: item.menu_id,
        amount: item.quantity,
      }));

      const billData = { orders };

      if (selectedGiveAway) {
          billData.giveaway_id = selectedGiveAway.id;
      }

      const id = getCookie("id");
      console.log(`Id in cookie: ${id}`);

      const billRes = await fetch("http://localhost:8080/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${id}`,
        },
        body: JSON.stringify(billData),
        credentials: "include",
      });

      const billText = await billRes.text();
      console.log("Bill API Response:", billText);

      if (billRes.status !== 201) {
        throw new Error(`Error creating bill: ${billText}`);
      }

      let createdBill;
      try {
        createdBill = JSON.parse(billText);
      } catch (e) {
        throw new Error("Invalid JSON response from /bill: " + billText);
      }

      alert("Bill created successfully!");
      router.push(`/BillOrder/${createdBill.bill_id}`);

    } catch (error) {
      setError(error.message);
      console.error("Error creating bill:", error);
      alert("Error creating bill: " + error.message);
    }
  };


  if (loading || giveAwayLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    );
  }

  if (!orderData) {
    return <div className="container mx-auto p-4">No order data found.</div>;
  }

  const totalPrice = orderData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu Order</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
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
                <TableCell>
                  {(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">Total Price: {totalPrice.toFixed(2)}</p>
      </div>

      {/* Give Away Dialog */}
      {totalPrice >= 60 && giveAways.length > 0 && (
           <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4">Select Give Away</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select a Give Away</DialogTitle>
                  <DialogDescription>
                    Choose a complimentary give-away item.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                {giveAways.map((giveAway) => (
                    <div key={giveAway.id} className="grid grid-cols-4 items-center gap-4">
                        {giveAway.img_url && giveAway.img_url.length > 0 && (
                            <Image
                                alt={`Giveaway ${giveAway.id}`}
                                src={`http://localhost:8080/${giveAway.img_url[0]}`}
                                width={100}  // Set an appropriate width
                                height={100} // Set an appropriate height
                                className="rounded-md col-span-1"
                                
                            />
                        )}
                      <label htmlFor={`giveaway-${giveAway.id}`} className="text-right col-span-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{giveAway.name}</p>
                            <p className="text-sm text-gray-500">{giveAway.desc}</p>
                          </div>
                            <input
                                type="radio"
                                id={`giveaway-${giveAway.id}`}
                                name="giveaway"
                                value={giveAway.id}
                                checked={selectedGiveAway?.id === giveAway.id}
                                onChange={() => setSelectedGiveAway(giveAway)}
                                className="mr-2"
                            />
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleCreateBill} disabled={!selectedGiveAway}>
                    Create Bill
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      )}


      {/* Create Bill Button (only show if give away is not available or not selected) */}
        {(totalPrice < 60 || giveAways.length === 0) && (
            <div className="mt-4">
                <Button onClick={handleCreateBill} variant="default">
                    Create Bill
                </Button>
            </div>
        )}
    </div>
  );
}