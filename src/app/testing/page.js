"use client";
import { useState, useEffect } from "react";
import EXIF from "exif-js";

function ImageViewer({ onError }) {
  const src = "/image.jpg";
  const [exifData, setExifData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const imgElement = document.createElement("img");
    imgElement.src = src;

    imgElement.onload = function () {
      try {
        EXIF.getData(imgElement, function () {
          const exif = EXIF.getAllTags(this);
          setExifData(exif);
          setIsLoading(false);
        });
      } catch (err) {
        setError("Could not read image metadata");
        onError?.(err);
        setIsLoading(false);
      }
    };

    imgElement.onerror = function (err) {
      setError("Failed to load image");
      onError?.(err);
      setIsLoading(false);
    };
  }, [src, onError]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "600px",
          height: "400px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src={src}
          alt="Image with EXIF"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: isLoading ? 0.5 : 1,
          }}
        />
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Loading...
          </div>
        )}
      </div>

      {exifData && !isLoading && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Image Details</h3>
          <div>
            {Object.entries(exifData)
              .filter(([key, value]) => value && typeof value !== "object")
              .map(([key, value]) => (
                <div key={key}>
                  <span style={{ fontWeight: 500 }}>{key}:</span>
                  <span>{value.toString()}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestingPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Image EXIF Viewer</h1>
      <ImageViewer />
    </div>
  );
}
