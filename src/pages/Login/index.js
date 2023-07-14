import React, { useEffect, useRef } from 'react';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';
import * as THREE from 'three';

export default function LoginPage() {
  const threeCanvasRef = useRef(null);
  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const xRows = 25;
    const zRows = 25;
    const cubeSize = 600;
    const cubeGap = 200;
    const cubeRow = cubeSize + cubeGap;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 20000);
    camera.position.y = 5000;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 5000, 10000);

    const pointLight = new THREE.PointLight(0x1060FF);
    pointLight.position.x = 0;
    pointLight.position.y = 1800;
    pointLight.position.z = -1800;
    scene.add(pointLight);
    
    const group = new THREE.Object3D();
    scene.add(group);
    const cubes = [];
    const halfXRows = cubeRow * -xRows / 2;
    const halfZRows = cubeRow * -zRows / 2;
    for (let x = 0; x < xRows; x++) {
      cubes[x] = [];
      for (let z = 0; z < zRows; z++) {
        let cubeHeight = 100 + Math.random() * 700;
        cubeHeight = 10 + (Math.sin(x / xRows * Math.PI) + Math.sin(z / zRows * Math.PI)) * 200 + Math.random() * 150;
        const geometry = new THREE.BoxGeometry(cubeSize, cubeHeight, cubeSize);
        const material = new THREE.MeshPhongMaterial({
          color: 0x4444ff,
          specular: 0xffffff,
          shininess: 10,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = halfXRows + x * cubeRow;
        cube.position.y = cubeHeight / 2;
        cube.position.z = (cubeRow * -zRows / 2) + z * cubeRow;
        cube.height = cubeHeight;
        group.add(cube);
        cubes[x][z] = cube;
      }
    }

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    threeCanvasRef.current.appendChild(renderer.domElement);
    const position = { x: 0, y: 0, z: 0 };
    function checkRow() {
      const xIndex = position.x / cubeRow;
      const xLoops = Math.floor(xIndex / xRows);
      const zIndex = position.z / cubeRow;
      const zLoops = Math.floor(zIndex / zRows);
      for (let x = 0; x < xRows; x++) {
        for (let z = 0; z < zRows; z++) {
          let dx, dz = 0;
          if (x >= xIndex - xLoops * xRows) {
            dx = xRows * (1 - xLoops);
          } else {
            dx = xRows * (0 - xLoops);
          }
          if (z >= zIndex - zLoops * zRows) {
            dz = zRows * (1 - zLoops);
          } else {
            dz = zRows * (0 - zLoops);
          }

          cubes[x][z].position.x = (x - dx) * cubeRow - halfXRows;
          cubes[x][z].position.z = (z - dz) * cubeRow - halfZRows;

          let scale = (cubes[x][z].position.z + group.position.z) / 1500;
          if (scale < 1) scale = 1;
          scale = Math.pow(scale, 1.2);

          cubes[x][z].scale.y = scale;

          cubes[x][z].position.y = (cubes[x][z].height * scale) / 2;
        }
      }
    }
    const camPos = new THREE.Vector3(0, 0, 0);
    let isRunning = true;
    function render(t) {
      if (isRunning) requestAnimationFrame(render);
      position.x += Math.sin(t * 0.002) * 2;
      position.z += (Math.cos(t * 0.0008) + 5) * 4;
      group.position.x = -position.x;
      group.position.z = -position.z;
      checkRow();
      camera.position.x = Math.sin(t * 0.0003) * 1000;
      camera.position.z = -4000;
      camera.position.y = (Math.cos(t * 0.0004) + 1.3) * 3000;
      camera.lookAt(camPos);
      renderer.render(scene, camera);
    }
    function onWindowResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize, false);
    render(0);
    return () => {
      isRunning = false;
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);
  
  return (
    <Main>
      <Header />
      <Login />
      <Canvas ref={threeCanvasRef}></Canvas>
      <Footer />
    </Main>
  );
}

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  padding: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
`;

const Canvas = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  mask-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 20%, rgb(255, 255, 255) 40%);
  object-fit: fill;
  object-position: center center;
  transition: all 1s ease 0s;
  transition: transform 0.3s ease-in-out;
  margin: 0;
`;