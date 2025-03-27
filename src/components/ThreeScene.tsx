
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameId = useRef<number | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add point lights for neon glow effect
    const colors = [
      0x9B6DFF, // neon.purple
      0xFF5EF9, // neon.pink
      0x5EB3FF, // neon.blue
      0x5EFFA3, // neon.green
      0x5EF9FF, // neon.cyan
    ];

    colors.forEach((color, index) => {
      const pointLight = new THREE.PointLight(color, 2, 50);
      const angle = (index / colors.length) * Math.PI * 2;
      const radius = 20;
      pointLight.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -10
      );
      scene.add(pointLight);
    });

    // Add a nebula-like particle system for background effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const posArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      // Create a sphere distribution
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const radius = 50 + Math.random() * 30;
      
      posArray[i] = Math.cos(angle1) * Math.sin(angle2) * radius;
      posArray[i+1] = Math.sin(angle1) * Math.sin(angle2) * radius;
      posArray[i+2] = Math.cos(angle2) * radius;
      
      // Vary particle sizes
      sizeArray[i/3] = 0.1 + Math.random() * 0.4;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.7,
      color: 0x9B6DFF,
      blending: THREE.AdditiveBlending,
      vertexColors: false,
    });
    
    const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
    particleMesh.position.z = -50;
    scene.add(particleMesh);
    particlesRef.current = particleMesh;

    // Create main spheres
    const spheres: THREE.Mesh[] = [];
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

    for (let i = 0; i < 12; i++) {
      const color = colors[i % colors.length];
      const material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.7,
        shininess: 100,
        emissive: color,
        emissiveIntensity: 0.2,
      });
      
      const sphere = new THREE.Mesh(sphereGeometry, material);
      
      // Place spheres randomly but keep them in the background
      sphere.position.x = (Math.random() - 0.5) * 60;
      sphere.position.y = (Math.random() - 0.5) * 60;
      sphere.position.z = -20 - Math.random() * 20;
      
      // Scale spheres randomly
      const scale = 1 + Math.random() * 3;
      sphere.scale.set(scale, scale, scale);
      
      scene.add(sphere);
      spheres.push(sphere);
    }
    
    spheresRef.current = spheres;

    // Add a glowing background circle effect
    const glowGeometry = new THREE.CircleGeometry(40, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x9B6DFF,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    
    const glowCircle = new THREE.Mesh(glowGeometry, glowMaterial);
    glowCircle.position.z = -60;
    scene.add(glowCircle);

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse movement for parallax effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!spheresRef.current || !cameraRef.current) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle camera movement
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseX * 2 - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (mouseY * 2 - cameraRef.current.position.y) * 0.02;
        cameraRef.current.lookAt(0, 0, 0);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      
      if (spheresRef.current) {
        spheresRef.current.forEach((sphere, index) => {
          // Create floating animation with different speeds
          const timeOffset = index * 0.2;
          const time = Date.now() * 0.0005;
          
          sphere.position.y += Math.sin(time + timeOffset) * 0.01;
          sphere.position.x += Math.cos(time + timeOffset) * 0.01;
          
          // Slow rotation of each sphere
          sphere.rotation.x += 0.002;
          sphere.rotation.y += 0.003;
        });
      }
      
      // Rotate particle system slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0003;
        particlesRef.current.rotation.x += 0.0001;
      }
      
      // Rotate glow circle
      if (glowCircle) {
        glowCircle.rotation.z += 0.0005;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (canvasRef.current && rendererRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose all geometries and materials
      spheresRef.current.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
      
      if (particleGeometry) particleGeometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      if (glowGeometry) glowGeometry.dispose();
      if (glowMaterial) glowMaterial.dispose();
    };
  }, []);

  return <div ref={canvasRef} className={`absolute inset-0 z-0 overflow-hidden ${className}`} />;
};

export default ThreeScene;
