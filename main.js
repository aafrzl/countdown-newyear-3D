// Countdown New Year
const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

const textBehind = document.getElementById('text-behind');
const textBehindBlur = document.getElementById('text-behind-blur');
const textFront = document.getElementById('text-front');

function updateCountdown() {
  const currentTime = new Date();

  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  const days = d < 10 ? '0' + d : d;
  const hours = h < 10 ? '0' + h : h;
  const minutes = m < 10 ? '0' + m : m;
  const seconds = s < 10 ? '0' + s : s;

  textBehind.innerHTML = `
  ${
    currentYear + 1
  }<br />COUNTDOWN<br />${days}:${hours}:${minutes}:${seconds}`;

  textBehindBlur.innerHTML = `
  ${
    currentYear + 1
  }<br />COUNTDOWN<br />${days}:${hours}:${minutes}:${seconds}`;

  textFront.innerHTML = `
  ${
    currentYear + 1
  }<br />COUNTDOWN<br />${days}:${hours}:${minutes}:${seconds}`;

  if (diff < 0) {
    newYearTime.setFullYear(currentYear + 1);
  }
}

setInterval(updateCountdown, 1000);

// 3D Assets Render
let theta = 0; // global theta variable

import * as THREE from 'https://cdn.skypack.dev/three@0.124.0';

import { RGBELoader } from 'https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader.js';

import { OBJLoader } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js';

var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  alpha: true,
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();

const hdrEquirect = new RGBELoader()
  // add your HDR //
  .load('/public/gradient-ml-2.hdr', function () {
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
  });

scene.environment = hdrEquirect;

scene.fog = new THREE.FogExp2(0x11151c, 0.15);

// Create a group to add camera and object
var group = new THREE.Group();
scene.add(group);

const pointLight = new THREE.PointLight(0x85ccb8, 7.5, 20);
pointLight.position.set(0, 3, 2);
group.add(pointLight);

const pointLight2 = new THREE.PointLight(0x9f85cc, 7.5, 20);
pointLight2.position.set(0, 3, 2);
group.add(pointLight2);

// Create a camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

//add camera to the group
group.add(camera);

const material1 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0,
  metalness: 0.5,
  envMapIntensity: 10,
});

// Load Model 3D
const objloader = new OBJLoader();
objloader.load('/public/skull-2.obj', (object) => {
  object.children[0].material = material1;
  object.scale.setScalar(3);
  object.position.set(0, -1, 0);
  group.add(object);
});

// RESIZE
window.addEventListener('resize', onWindowResize);

var update = function () {
  theta += 0.0025;

  //create a panning animation for the camera
  camera.position.x = Math.sin(theta) * 10;
  camera.position.z = Math.cos(theta) * 10;
  camera.position.y = Math.cos(theta);

  pointLight.position.x = Math.sin(theta + 1) * 11;
  pointLight.position.z = Math.cos(theta + 1) * 11;
  pointLight.position.y = 2 * Math.cos(theta - 3) + 3;

  pointLight2.position.x = -Math.sin(theta + 1) * 11;
  pointLight2.position.z = -Math.cos(theta + 1) * 11;
  pointLight2.position.y = 2 * -Math.cos(theta - 3) - 6;

  group.rotation.y += 0.01;

  //keep camera to look at 0,0,0
  camera.lookAt(0, 0, 0);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
