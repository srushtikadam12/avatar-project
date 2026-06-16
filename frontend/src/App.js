import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState } from "react";
import axios from "axios";

function AvatarModel({ height, bodyType }) {
  const { scene } = useGLTF("/avatar.glb");

  const heightScale =
    1 + ((height - 170) / 50) * 0.25;

  const widthScale =
    1 + bodyType * 1.2;

  return (
    <primitive
      object={scene}
      scale={[
        widthScale,
        heightScale,
        widthScale,
      ]}
      position={[0, -1.2, 0]}
    />
  );
}

function App() {
  const [avatarName, setAvatarName] = useState("");
  const [gender, setGender] = useState("Female");
  const [hairStyle, setHairStyle] = useState("Long Hair");

  const [skinColor, setSkinColor] = useState("#c68642");
  const [eyeColor, setEyeColor] = useState("#654321");

  const [height, setHeight] = useState(170);
  const [bodyType, setBodyType] = useState(1);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "https://twin-try-backend.onrender.com/upload/",
        formData
      );

      setImage(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };

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
      console.error(error);
    }
  };

  const saveAvatar = () => {
    alert("Avatar Saved Successfully!");
  };

  return (
    <div className="main-container">
      {/* LEFT PANEL */}
      <div className="avatar-panel">
        <h1 className="title">Twin Try</h1>

        <Canvas
          camera={{
            position: [0, 1.5, 6],
            fov: 50,
          }}
          style={{ height: "85vh" }}
        >
          <ambientLight intensity={1} />

          <directionalLight
            position={[2, 2, 5]}
            intensity={1.5}
          />

          <AvatarModel
            height={height}
            bodyType={bodyType}
          />

          <OrbitControls
            minDistance={4}
            maxDistance={8}
          />
        </Canvas>
      </div>

      {/* RIGHT PANEL */}
      <div className="control-panel">
        <h2>Customize Avatar</h2>

        <hr />

        <h3>Avatar Name</h3>

        <input
          className="input"
          type="text"
          placeholder="Enter Avatar Name"
          value={avatarName}
          onChange={(e) =>
            setAvatarName(e.target.value)
          }
        />

        <h3>Gender</h3>

        <select
          className="select"
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
        >
          <option>Female</option>
          <option>Male</option>
        </select>

        <h3>Hair Style</h3>

        <select
          className="select"
          value={hairStyle}
          onChange={(e) =>
            setHairStyle(e.target.value)
          }
        >
          <option>Long Hair</option>
          <option>Ponytail</option>
          <option>Short Hair</option>
          <option>Curly Hair</option>
        </select>

        <h3>Skin Tone</h3>

        <input
          type="color"
          value={skinColor}
          onChange={(e) =>
            setSkinColor(e.target.value)
          }
        />

        <p>{skinColor}</p>

        <h3>Eye Color</h3>

        <input
          type="color"
          value={eyeColor}
          onChange={(e) =>
            setEyeColor(e.target.value)
          }
        />

        <p>{eyeColor}</p>

        <hr />

        <h3>Height</h3>

        <input
          type="range"
          min="150"
          max="220"
          step="1"
          value={height}
          onChange={(e) =>
            setHeight(Number(e.target.value))
          }
        />

        <p>{height} cm</p>

        <h3>Body Type</h3>

        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={bodyType}
          onChange={(e) =>
            setBodyType(Number(e.target.value))
          }
        />

        <p>
          {bodyType < 0.7
            ? "Slim"
            : bodyType < 1.4
            ? "Average"
            : "Broad"}
        </p>

        <button
          className="button"
          onClick={saveAvatar}
        >
          Save Avatar
        </button>

        <hr />

        <h3>Upload Clothing Image</h3>

        <input
          type="file"
          onChange={handleUpload}
        />

        <br />
        <br />

        <h3>Myntra / Amazon Link</h3>

        <input
          className="input"
          type="text"
          placeholder="Paste Product Image URL"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(e.target.value)
          }
        />

        <button
          className="button"
          onClick={handleUrlSubmit}
        >
          Try On Outfit
        </button>

        {image && (
          <div>
            <h3>Clothing Preview</h3>

            <img
              src={image}
              alt="preview"
              className="preview-img"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;