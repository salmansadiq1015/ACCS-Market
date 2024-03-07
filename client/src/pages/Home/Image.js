import React, { useState } from "react";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState(null);
  console.log(imageUrl);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
