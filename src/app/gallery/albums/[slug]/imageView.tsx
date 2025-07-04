import exif from "exif-js";
import { FacebookIcon, InstagramIcon, TwitterIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function ImageViewComponent({
  id,
  turnOffImageComponent,
}: {
  id: string;
  turnOffImageComponent: any;
}) {
  const image = {
    name: "A Dolphin",
    id: id,
    imageUrl: "/image.jpg",
  };
  const [exifData, setExifData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageDate, setImageDate] = useState<any>(null);
  const noDate = false;
  useEffect(() => {
    setIsLoading(true);
    const imgStuff = document.createElement("img");
    imgStuff.src = image.imageUrl;
    imgStuff.onload = function () {
      try {
        exif.getData(imgStuff as any, function (this: any) {
          const exif1 = exif.getAllTags(this);
          setExifData(exif1);
        });
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  const formatExifDate = (dateStr: string | null) => {
    if (!dateStr) return "No date available";
    try {
      const cleanDateStr = dateStr
        .replace("\u0000", "")
        .replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");

      const date = new Date(cleanDateStr);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date";
    }
  };

  const getImageDate = () => {
    if (exifData?.DateTimeOriginal) {
      return formatExifDate(exifData.DateTimeOriginal);
    }
    if (exifData?.DateTimeDigitized) {
      return formatExifDate(exifData.DateTimeDigitized);
    }
    if (exifData?.DateTime) {
      return formatExifDate(exifData.DateTime);
    }
    return "No date available";
  };

  useEffect(() => {
    console.log(exifData);
    setImageDate(getImageDate());
  }, [exifData]);

  const items = [
    {
      name: "Title",
      content: image.name,
      contentsize: "2xl",
    },
    {
      name: "Capture Date",
      content: imageDate,
      contentsize: "lg",
    },
    {
      name: "Image Size",
      content: `${exifData?.PixelXDimension}x${exifData?.PixelYDimension}`,
      contentsize: "xl",
    },
    {
      name: "Camera Maker",
      content: exifData?.Make,
      contentsize: "md",
    },
    {
      name: "Camera",
      content: exifData?.Model,
      contentsize: "2xl",
    },
    {
      name: "ISO",
      content: exifData?.ISOSpeedRatings,
      contentsize: "2xl",
    },
    {
      name: "Shuttle Speed",
      content: `${exifData?.ExposureTime?.numerator}/${exifData?.ExposureTime?.denominator}`,
      contentsize: "2xl",
    },
    {
      name: "Software",
      content: exifData?.Software,
      contentsize: "xl",
    },
  ];
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-12">
        <div className="w-full h-screen flex lg:flex-row flex-col gap-0">
          {/* Image Container */}
          <div className="lg:w-4/5 w-full h-full flex items-center justify-center p-4 mr-0">
            <div className="flex flex-col text-white mr-0">
              <img
                src={image.imageUrl}
                alt={`An Image of ${image.name}`}
                className="max-h-[90vh] w-auto max-w-full object-contain rounded-lg mb-2 mr-0"
              />
              {/**<div className="flex flex-row ml-2 gap-2">
                <Link href="">
                  <TwitterIcon />
                </Link>
                <Link href="">
                  <FacebookIcon />
                </Link>
                <Link href="">
                  <InstagramIcon />
                </Link>
              </div> */}
            </div>
          </div>
          <div className="lg:mt-12 lg:w-1/4 ml-0 mb-12 h-full w-full">
            <div className="flex flex-col lg:mt-[8vh]  bg-black/30 w-full mb-12 min-h-none max-h-[300px] md:max-h-[200px] lg:min-h-[69vh] lg:max-h-none rounded-lg ml-0 p-3 overflow-y-scroll">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                items.map((i) => (
                  <div className="flex flex-col m-2" key={i.name}>
                    <span className="text-lg text-gray-400">{i.name}</span>
                    <span
                      className={`text-${i.contentsize || "lg"} text-white transition-all duration-200`}
                    >
                      {i.content}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <button
          onClick={turnOffImageComponent}
          className="absolute top-4 right-4 text-white bg-gray-500/70 hover:bg-gray-500/50 rounded p-2 hover:cursor-pointer transition-all duration-200"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}
