"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link href={`/products/${product._id}`} className="w-[220px] flex flex-col gap-2 group">
      <div className="relative w-[250px] h-[300px]">
        <Image
          src={product.media[0]}
          alt="product"
          layout="fill"
          objectFit="cover"
          className={`rounded-lg ${product.media[1] ? "group-hover:opacity-0 transition-opacity duration-300" : ""}`}
        />
        {product.media[1] && (
          <Image
            src={product.media[1]}
            alt="product hover"
            layout="fill"
            objectFit="cover"
            className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
      </div>
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  );
};

export default ProductCard;

