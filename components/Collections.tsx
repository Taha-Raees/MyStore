import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { CollectionType } from "@/lib/types";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <div className="relative w-[350px] h-[200px] group">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg cursor-pointer"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <p className="text-white text-lg font-bold">{collection.title}</p>
                  <p className="text-white text-xs font-light text-center">{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
