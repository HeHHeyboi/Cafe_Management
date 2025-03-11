'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";  // Import the Button component
import { Trash2 } from 'lucide-react'; // Import an icon (optional, but recommended)


export default function BillPage() {
    const [bills, setBills] = useState([]);
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
                console.log(data)
                const processedData = Array.isArray(data) ? data.map(bill => ({
                    ...bill,
                    giveaway: bill.total >= 60 ? 1 : 0
                })) : [];
                setBills(processedData);
            } catch (error) {
                console.error("Error fetching bill data:", error);
                setError("Failed to load bill data. Please try again.");
                setBills([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleBillClick = (billId) => {
        router.push(`/BillOrder/${billId}`);
    };

    const handleDelete = async (billId) => {
        // --- Confirmation Prompt (No AlertDialog) ---
        if (!window.confirm("Are you sure you want to delete this bill? This action cannot be undone.")) {
            return; // Stop the deletion if the user cancels.
        }


        try {
            const response = await fetch(`http://localhost:8080/bill/${billId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update the state to remove the deleted bill.  .filter() is crucial here.
            setBills(prevBills => prevBills.filter(bill => bill.bill_id !== billId));

            // Optionally show a success message (you could use a toast library here)
            console.log(`Bill ${billId} deleted successfully`);


        } catch (error) {
            console.error("Error deleting bill:", error);
            // Optionally show an error message to the user
            setError(`Failed to delete bill ${billId}.  Please try again.`); // Set a more specific error
        }
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
                            className="w-full shadow-lg transition hover:bg-gray-100"

                        >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle>Invoice #{bill.bill_id}</CardTitle>
                                    <CardDescription>Created: {new Date(bill.pay_date).toLocaleString()}</CardDescription>
                                </div>
                                 <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(bill.bill_id)}>
                                    <Trash2 className="h-4 w-4" />
                                 </Button>
                            </CardHeader>
                            <CardContent onClick={() => handleBillClick(bill.bill_id)} className="cursor-pointer">
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
                            <CardFooter className="flex justify-between"  onClick={() => handleBillClick(bill.bill_id)}>
                                <div className="text-sm text-gray-600">{bill.orders.length} items</div>
                                <div className="font-bold">Total: ${bill.total.toFixed(2)}</div>
                            </CardFooter>
                             {bill.giveaway > 0 && (
                                 <div className="p-2 text-center bg-green-100 text-green-800 font-semibold"  onClick={() => handleBillClick(bill.bill_id)}>
                                    🎁 Giveaway Included!
                                 </div>
                             )}
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No Bills Available</div>
            )}
        </div>
    );
}