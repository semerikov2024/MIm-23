import * as THREE from "three";
import * as MINDAR from "mindar";


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MINDAR.MindARThree({
			container: document.body,
			imageTargetSrc: "assets/faceapteka.mind",
			maxTrack: 2,
			uiLoading: "no", 
			uiScanning: "yes", 
			uiError: "no"
      		});

		const {renderer, scene, camera} = mindarThree;
		const anchor_face = mindarThree.addAnchor(0);
		const anchor_apteka = mindarThree.addAnchor(1);

		//anchor.group.add(plane);
		//  <a-box width="1" height="1" depth="1" color="green"></a-box>
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.5, transparent: true } );
		const cube = new THREE.Mesh( geometry, material );
		anchor_face.group.add( cube );

		camera.position.z = 5;
		cube.rotation.set(Math.PI/4, Math.PI/3, Math.PI/2);
		cube.position.set(-5, 0, -12);


		var pyramidgeometry=new THREE.CylinderGeometry(0, 0.8, 2, 4);
		var pyramidmaterial=new THREE.MeshLambertMaterial({color: 0xF3FFE2});
		var pyramidmesh=new THREE.Mesh(pyramidgeometry, pyramidmaterial);
		pyramidmesh.position.set(0, 2, -10);
		anchor_face.group.add(pyramidmesh);

		var lightOne=new THREE.AmbientLight(0xffff, 0.5);
		scene.add(lightOne);

		var lightTwo=new THREE.PointLight(0xffff, 2.5);
		anchor_face.group.add(lightTwo);
		lightTwo.position.set(0, 1.5, -8.5);

		var spheregeometry=new THREE.SphereGeometry(0.5);
		var spherematerial=new THREE.MeshBasicMaterial({wireframe: true, color: 0x0000000});
		var spheremesh=new THREE.Mesh(spheregeometry, spherematerial);
		spheremesh.position.set(0.9, 0, -6);
		anchor_apteka.group.add(spheremesh);


		var circlegeometry=new THREE.CircleGeometry(0.5);
		var circlematerial=new THREE.MeshStandardMaterial({
		color: 0xf98877,
		roughness: 90.0,
		metalness: 0.2
		});
		var circlemesh=new THREE.Mesh(circlegeometry, circlematerial);
		circlemesh.position.set(2, 0, -6);
		circlemesh.rotation.set(0, 0.5, 0);
		anchor_apteka.group.add(circlemesh);


		var planegeometry=new THREE.PlaneGeometry(10, 10);
		var planematerial=new THREE.MeshPhongMaterial({color: 0x77ff00, specular: 0xFF0000, shininess: 50});
		var planemesh=new THREE.Mesh(planegeometry, planematerial);
		planemesh.position.set(0, -4, -100);
		anchor_apteka.group.add(planemesh);

		await mindarThree.start();

		let phi = 0;

		renderer.setAnimationLoop(() => {
			cube.rotation.x += Math.PI/180;
		//	camera.rotation.y += 1.5*Math.PI/180;
			pyramidmesh.rotation.y+=0.1;

			phi += Math.PI/180;
			let dx = 3*Math.cos(phi),
				dy = 2*Math.sin(phi);
			spheremesh.position.set(0.9 + dx, 0 + dy, -6);
		  	renderer.render(scene, camera);
		});
	}
	start();
});


