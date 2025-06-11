"use client";
import Loading from "@/components/loading";
import BlobCursor from "@/components/blobcursor";
import HeroSection from "@/components/heroSection";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loading onComplete={() => setLoading(false)} />
      ) : (
        <div className="">
          <HeroSection />
          <BlobCursor />
        </div >
      )
      }
    </>
  );
}
