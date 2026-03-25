import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(1);
  const [imageUrl, setImageUrl] = useState("");

  // Upload file (correct)
const handleUpload = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  await axios.post(
    "https://twin-try-backend.onrender.com/upload/",
    formData
  );

  setImage(URL.createObjectURL(file));
};

// Handle image URL (correct)
const handleUrlSubmit = async () => {
  if (!imageUrl) return;

  setImage(imageUrl);

  await axios.post(
    "https://twin-try-backend.onrender.com/upload-link/",
    {
      url: imageUrl
    }
  );
};