import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Load 3D model
function AvatarModel() {
  const { scene } = useGLTF("/avatar.glb");
  return <primitive object={scene} scale={2} />;
}

function AvatarPage() {
  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Your 3D Avatar</h1>

      <Canvas style={{ height: "500px" }}>
        <ambientLight />
        <directionalLight position={[2, 2, 5]} />

        <AvatarModel />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default AvatarPage;