/* global THREE */
/* global Detector */

// Gets a handle to this import doc.
var doc = document.currentScript.ownerDocument;
// Create element prototype
var glTFViewPrototype = Object.create(HTMLElement.prototype);

var defaults = {
   controls: 'TrackballControls',
   scale: '0.002',
   material: '',
   width: '320px',
   height: '240px'
};

function extend(target, source)
{
   for (var key in source)
   {
      target[key] = source[key];
   }

   return target;
}

glTFViewPrototype.createdCallback = function()
{
   // add template to shadow root
   var t = doc.querySelector('template:first-child');
   var clone = doc.importNode(t.content, true);
   this.root = this.createShadowRoot().appendChild(clone);
   var elementAttributes = {};

   for (var attribute in this.attributes)
   {
      if (this.attributes[attribute].nodeName)
      {
         elementAttributes[this.attributes[attribute].nodeName] = this.attributes[attribute].nodeValue;
      }
   }

   this.settings = extend(defaults, elementAttributes);

   this.loadFile();
};

glTFViewPrototype.initialize = function()
{
   // bind on files opened by the filesystem
   //this.model.get("fs").bind("change:openedFile", this.loadFile, this);
   // bind on material selection
   //this.model.get("material").bind("change:selectedMaterial", this.updateMaterial, this);
   // bind on window resize
   window.onresize = this.onResize.bind(this);

   if (Detector.webgl)
   {
      this.renderer = new THREE.WebGLRenderer(
      {
         antialias: true
      });
   }
   else
   {
      Detector.addGetWebGLMessage();
      this.renderer = new THREE.CanvasRenderer();
   }

   var viewer = this.shadowRoot.querySelector("#viewer");

   viewer.style.width = this.settings.width;
   viewer.style.height = this.settings.height;

   this.scene = new THREE.Scene();
   this.camera = new THREE.PerspectiveCamera(60, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
   this.camera.position.set(4, 4, 3);
   this.controls = {};
   var ambient = new THREE.AmbientLight(0x050505);
   this.scene.add(ambient);
   var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
   directionalLight.position.set(2, 1.2, 10).normalize();
   this.scene.add(directionalLight);
   directionalLight = new THREE.DirectionalLight(0xffffff, 1);
   directionalLight.position.set(-2, 1.2, -10).normalize();
   this.scene.add(directionalLight);
   var pointLight = new THREE.PointLight(0xffaa00, 2);
   pointLight.position.set(2000, 1200, 10000);
   this.scene.add(pointLight);

   // Grid
   var size = 14,
      step = 1;

   var geometry = new THREE.Geometry();
   var material = new THREE.LineBasicMaterial(
   {
      color: 0xcccccc,
      opacity: 0.2
   });
   for (var i = -size; i <= size; i += step)
   {
      geometry.vertices.push(new THREE.Vector3(-size, -0.04, i));
      geometry.vertices.push(new THREE.Vector3(size, -0.04, i));
      geometry.vertices.push(new THREE.Vector3(i, -0.04, -size));
      geometry.vertices.push(new THREE.Vector3(i, -0.04, size));
   }
   var line = new THREE.Line(geometry, material, THREE.LinePieces);
   this.scene.add(line);

   // start the renderer
   this.renderer.setSize(viewer.clientWidth, viewer.clientHeight);
   this.renderer.setClearColor(0xffffff);
   this.controls.trackball = new THREE.TrackballControls(this.camera, viewer);
   this.controls.trackball.staticMoving = true;

   viewer.appendChild(this.renderer.domElement);
};

glTFViewPrototype.attributeChangedCallback = function(attrName, oldVal, newVal)
{
   switch (attrName)
   {
      case 'src':
         this.settings.src = newVal;
         this.loadFile();

         break;

      case 'width':

         break;

      case 'height':

         break;

      case 'scale':

         break;
   }

};

glTFViewPrototype.animate = function()
{
   window.requestAnimationFrame(this.animate.bind(this));
   this.render();
};

glTFViewPrototype.render = function()
{
   this.controls.trackball.update();
   this.renderer.render(this.scene, this.camera);
};

glTFViewPrototype.loadFile = function()
{
   var glTFLoader = new THREE.glTFLoader();

   glTFLoader.load(this.settings.src, function(collada)
   {
      var dae = collada.scene;
      // scale model
      dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
      dae.updateMatrix();
      this.initialize();
      this.animate();

      // if a model is already loaded
      if (this.currentModel)
      {
         this.scene.remove(this.currentModel);
         this.currentModel = null;
      }

      // set current model
      this.currentModel = dae;
      // add model to scene
      this.scene.add(dae);

      this.updateLoadReady(collada);

   }.bind(this), this.updateLoadProgress.bind(this));
};

glTFViewPrototype.updateLoadProgress = function(progressInfoObj)
{
   var event = new CustomEvent('progress-state-change', progressInfoObj);
   // Dispatch the event.
   this.dispatchEvent(event);
};

glTFViewPrototype.updateLoadReady = function(collada)
{
   var event = new CustomEvent('progress-state-ready', collada);
   // Dispatch the event.
   this.dispatchEvent(event);
};

glTFViewPrototype.onResize = function()
{
   // set a timer so we check for
   // new dimensions AFTER the resize is completed
   setTimeout(function()
   {
      //this.camera.aspect = this.width / this.height;
      //this.camera.updateProjectionMatrix();

      //this.renderer.setSize(this.width, this.height);

   }.bind(this), 500);
};

document.registerElement("gltf-viewer",
{
   prototype: glTFViewPrototype
});
