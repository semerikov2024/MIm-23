import * as THREE from "three";

//<a-scene>
const scene = new THREE.Scene();
//  <a-camera>
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//  <a-box width="1" height="1" depth="1" color="green"></a-box>
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
//camera.position.x = 2;

function animate() {
	cube.rotation.x += Math.PI/180;
	camera.rotation.y += 1.5*Math.PI/180;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

//</a-scene>
