(function() {
  var element;

  element = document.querySelector('gltf-viewer');

  debugger;

  describe('<gltf-viewer>', function() {
    describe('WebGL', function() {
      return it('should be enabled', function() {
        return expect(Detector.webgl).to.be["true"];
      });
    });
    describe('element', function() {
      it('should exist', function() {});
      return expect(element).to.be.a('object');
    });

    /*
    it 'should update model when src attribute changes', ->
       element.setAttribute "src", "duck.json"
    
     * element gets loaded before listener is added
    it 'should throw progress-state-change while loading asset', (done) ->
       element.addEventListener 'progress-state-change', ->
          done()
    
    it 'should throw progress-state-ready after asset is loaded', (done) ->
       element.addEventListener 'progress-state-ready', ->
          done()
     */
    it('should resize when width attribute changes', function() {
      return element.setAttribute("width", "");
    });
    it('should resize when height attribute changes', function() {
      return element.setAttribute("height", "");
    });
    return it('should scale the model when scale attribute changes', function() {
      return element.setAttribute("scale", "");
    });
  });

}).call(this);
