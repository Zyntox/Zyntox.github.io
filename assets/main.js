var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

function hideScreen(){
  var loadingScreen = document.getElementById('loading-screen');
  loadingScreen.className += " hide-screen";
}

// function for checking if about-me images has loaded.
if(document.getElementById("header--aboutMe")){
  img = document.getElementById("header--aboutMe");

  if (img.complete) {
    hideScreen();
  } else {
    img.addEventListener('load', hideScreen(), false);
    img.addEventListener('error', function() {
    console.log('There was an error when loading the jumbotron image.');
  })
  }
}


// Function to present random facts about me on the "about me" page
function randomFact(){
        if (document.getElementById('randfact')){
            var container = document.getElementById('randfact'),
                fact = [
                    '<b>Slumpmässig fakta:</b> Bjuder man ut Marcus på lunch så är sushi ett bra alternativ!',
                    '<b>Slumpmässig fakta:</b> Marcus föredrar varma länder före kalla.',
                    '<b>Slumpmässig fakta:</b> Marcus favoritfärg är orange.',
                    '<b>Slumpmässig fakta:</b> Marcus favorit föremål från när han var liten? <i>Game Boy !</i>',
                    '<b>Slumpmässig fakta:</b> Marcus är grym på att laga korvstroganoff.</i>'
                ],
                factTwo = [
                  '<b>Random fact:</b> If you invite Marcus out for lunch, sushi would be a good choice!',
                  '<b>Random fact:</b> Marcus prefers warm countris to cold ones!',
                  '<b>Random fact:</b> Marcus favorite color is orange',
                  '<b>Random fact:</b> Marcus favorite item from his childhood? The Game Boy!',
                ];

            if (document.getElementsByClassName('swedish').length != 0 ){
              container.innerHTML = fact[Math.floor(Math.random() * 5)];
            } else if (document.getElementsByClassName('english').length != 0){
              container.innerHTML = factTwo[Math.floor(Math.random() * 4)];
            }
        } else
            return;
}


//Function for setting up the three.js scene and renderer.
function setHeaderlogo(){

    //Checks which model to load for each page.
    if(document.getElementById('CV')){
        var model = 'assets/models/clock logo2.obj',
            perspective = 3.4,
            cameraPosZ = 52,
            cameraPosY = 0.5;
    }

    else if(document.getElementById('PB')){
        var model = 'assets/models/untitled.obj',
        perspective = 2.5,
        cameraPosZ = 170,
        cameraPosY = 1;
    }
    else{
        return;
    }


    var element  = document.getElementsByClassName('jumbotron__logo'),
        width = element[0].offsetWidth,
        height = element[0].offsetHeight,
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(perspective, width / height, 0.1, 1000),
        renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } ),
        myModel;

    //Sets up the scenes dimension and then the location.
    renderer.setSize(width, height);
    element[0].appendChild(renderer.domElement);


    // instantiate a loader
    var loader = new THREE.OBJLoader();

    loader.load(model, function(object){
      //  mesh = object;
      //  scene.add( mesh )
      //  console.log(mesh.material);
      //  console.log(mesh.material.color);

      var material = new THREE.MeshBasicMaterial( { color: 0x75F2CE } );

       object.traverse(function(child){
        if( child instanceof THREE.Mesh){
          child.material = material;
        }
       });

       myModel = object;

       scene.add( myModel );



       camera.position.z = cameraPosZ;
       camera.position.y = cameraPosY;

       // Remove loading screen
       if(document.getElementById('loading-screen')){
         hideScreen();
       }



       var render = function () {
       requestAnimationFrame( render );

       myModel.rotation.y += 0.007;
       renderer.render(scene, camera);
       };

       render();
    },
    // Function executed when the object is being loaded.
    function ( xhr ) {
      var progressBar = document.getElementById('loader');
        progressBar.style.width =  (xhr.loaded / xhr.total * 100 ) + "%";
		    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	  },
    // Function executed when there was an error loading the model.
    function(){
      console.log("There was an error loading the model, please contact the site owner.")
    }
  )
}

function setTimelineHeight(){
    if(document.getElementById('timeline__line')){
        var timeline = document.getElementById('timeline__line'),
            container = document.getElementsByClassName('timeline');

            timeline.style.height = container[0].offsetHeight + 100;
    } else {
      return;
    }
}

window.onresize = function(event) {
    setTimelineHeight();
};


window.onload = function(){
    setTimelineHeight();
    setHeaderlogo();
    randomFact();
};
