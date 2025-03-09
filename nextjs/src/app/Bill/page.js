'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function BillPage() {
  const [bills, setBills] = useState([]);  // Ensure it's an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/bill');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBills(Array.isArray(data) ? data : []); // Ensure 'data' is always an array
      } catch (error) {
        console.error("Error fetching bill data:", error);
        setError("Failed to load bill data. Please try again.");
        setBills([]); // Ensure bills is set to an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBillClick = (billId) => {
    router.push(`/BillOrder/${billId}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">All Bills</h1>

      {error && (
        <Card className="w-full mb-4">
          <CardContent className="p-6 text-center text-red-600">{error}</CardContent>
        </Card>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full">
              <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
              <CardContent><Skeleton className="h-24 w-full" /></CardContent>
            </Card>
          ))}
        </div>
      ) : bills.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {bills.map((bill) => (
            <Card
              key={bill.bill_id}
              className="w-full shadow-lg cursor-pointer transition hover:bg-gray-100"
              onClick={() => handleBillClick(bill.bill_id)}
            >
              <CardHeader>
                <CardTitle>Invoice #{bill.bill_id}</CardTitle>
                <CardDescription>Created: {new Date(bill.created_at).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bill.orders.slice(0, 3).map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{`Item ${order.menu_id}`}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>${order.total_price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-600">{bill.orders.length} items</div>
                <div className="font-bold">Total: ${bill.total.toFixed(2)}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No Bills Available</div>
      )}
    </div>
  );
}
