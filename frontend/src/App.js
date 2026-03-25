import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(1);
  const [imageUrl, setImageUrl] = useState("");

  // Upload file
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "https://twin-try-backend.onrender.com/upload/",
        formData
      );

      setImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Handle image URL
  const handleUrlSubmit = async () => {
    if (!imageUrl) return;

    setImage(imageUrl);

    try {
      await axios.post(
        "https://twin-try-backend.onrender.com/upload-link/",
        {
          url: imageUrl,
        }
      );
    } catch (error) {
      console.error("URL upload error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#2c3e50" }}>Twin Try</h1>

      {/* Avatar Section */}
      <h3>Your Avatar</h3>

      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Avatar */}
        <img
          src="/avatar.png"
          alt="avatar"
          style={{ transform: `scaleX(${size})` }}
          width="250"
        />

        {/* Cloth Overlay */}
        {image && (
          <img
            src={image}
            alt="cloth"
            style={{
              position: "absolute",
              top: "80px",
              left: "50px",
              width: "150px",
              opacity: 0.9,
            }}
          />
        )}
      </div>

      <br />

      {/* Slider */}
      <input
        type="range"
        min="0.5"
        max="1.5"
        step="0.1"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <br /><br />

      {/* Upload File */}
      <input type="file" onChange={handleUpload} />

      <br /><br />

      {/* Paste Image URL */}
      <input
        type="text"
        placeholder="Paste Amazon/Myntra image link"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ width: "300px" }}
      />

      <br /><br />

      <button onClick={handleUrlSubmit}>Load Image</button>

      {/* Preview */}
      {image && (
        <div>
          <h3>Clothing Preview</h3>
          <img src={image} alt="preview" width="200" />
        </div>
      )}
    </div>
  );
}

export default App;