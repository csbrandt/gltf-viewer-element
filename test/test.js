(function() {
  var element;

  element = document.querySelector('gltf-viewer');

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
    it('should throw progress-state-ready after asset is loaded', function(done) {
      return element.addEventListener('progress-state-ready', function() {
        return done();
      });
    });
    it('should update model when src attribute changes', function() {
      return element.setAttribute("src", "duck.json");
    });
    it('should throw progress-state-change while loading asset', function(done) {
      return element.addEventListener('progress-state-change', function() {
        return done();
      });
    });
    it('should resize when width attribute changes', function() {
      return element.setAttribute("width", "600px");
    });
    return it('should resize when height attribute changes', function() {
      return element.setAttribute("height", "400px");
    });
  });

}).call(this);
