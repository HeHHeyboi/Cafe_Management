'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggined = localStorage.getItem("isLoggined");

    console.log("is Loggined: ", isLoggined);
    if (isLoggined) {
      router.push("/Admin/MenuOrder");
    } else {
      router.push("/Login");
    }
  }, []);

  return null; // หรือ loading spinner ก็ได้
}
