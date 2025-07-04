// MAIN CLIENT PAGE
//

"use client";
import { useState, useEffect } from "react";
import ImageViewComponent from "./imageView";
import { dbInterface, SearchParams } from "./types";

export default function AlbumsPage({
  slug,
  searchParams,
  db,
}: {
  slug: string;
  searchParams: SearchParams;
  db: dbInterface;
}) {
  const [activateImagePopup, setActivateImagePopup] = useState<boolean>(false);
  const imageId = searchParams?.image as string;
  useEffect(() => {
    if (imageId && imageId.length > 0) {
      setActivateImagePopup(true);
    }
  }, [imageId]);
  return (
    <div className="">
      {activateImagePopup && <ImageViewComponent id="0" />}
    </div>
  );
}
