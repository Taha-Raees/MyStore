"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error(`Error fetching user data: ${res.statusText}`);
      }
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
      setError("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    if (!signedInUser) {
      setLoading(false);
      return;
    }

    try {
      const wishlistProducts = await Promise.all(
        signedInUser.wishlist.map(async (productId) => {
          const product = await getProductDetails(productId);
          return product;
        })
      );
      setWishlist(wishlistProducts);
    } catch (err) {
      console.error("Error fetching wishlist products:", err);
      setError("Failed to fetch wishlist products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {error && <p className="text-red-500">{error}</p>}
      {wishlist.length === 0 && !error && <p>No items in your wishlist</p>}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
