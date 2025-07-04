// MAIN CLIENT PAGE
//

"use client";
import { useState, useEffect } from "react";
import ImageViewComponent from "./imageView";
import { dbInterface, SearchParams } from "./types";
import { useRouter } from "next/navigation";

export default function AlbumsPage({
  slug,
  searchParams,
  db,
}: {
  slug: string;
  searchParams: SearchParams;
  db: dbInterface;
}) {
  const router = useRouter();
  const [activateImagePopup, setActivateImagePopup] = useState<boolean>(false);
  const imageId = searchParams?.image as string;
  useEffect(() => {
    if (imageId && imageId.length > 0) {
      setActivateImagePopup(true);
    }
  }, [imageId]);
  const turnOffImageComponent = () => {
    setActivateImagePopup(false);
    router.replace(`/gallery/albums/${slug}`);
  };
  return (
    <div className="">
      {activateImagePopup && (
        <ImageViewComponent
          id="0"
          turnOffImageComponent={turnOffImageComponent}
        />
      )}
    </div>
  );
}
