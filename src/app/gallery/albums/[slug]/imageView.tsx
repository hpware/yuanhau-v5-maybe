//import { Suspense } from "react";
//import exif from "exif-js";
export default function ImageViewComponent({ id }: { id: string }) {
  const image = [
    {
      name: "A Elephant",
      id: id,
      imageUrl:
        "https://images.unsplash.com/photo-1741575006385-c9f4730b284b?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="fixed inset-0 z-50 md:m-12 flex flex-row flex-wrap items-center align-middle bg-black/80 justify-center">
      <div className="relative h-full">
        <img
          src={image[0].imageUrl}
          alt={`An Image of ${image[0].name}`}
          className="w-full h-full object-left"
        />
      </div>
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
      >
        ✕
      </button>
    </div>
  );
}
