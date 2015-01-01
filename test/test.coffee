element = document.querySelector 'gltf-viewer'

debugger

describe '<gltf-viewer>', ->
   describe 'WebGL', ->
      it 'should be enabled', ->
         expect(Detector.webgl).to.be.true

   describe 'element', ->
      it 'should exist', ->
      expect(element).to.be.a('object')

   ###
   it 'should update model when src attribute changes', ->
      element.setAttribute "src", ""

   # element gets loaded before listener is added
   it 'should throw progress-state-change while loading asset', (done) ->
      element.addEventListener 'progress-state-change', ->
         done()

   it 'should throw progress-state-ready after asset is loaded', (done) ->
      element.addEventListener 'progress-state-ready', ->
         done()
   ###
   it 'should resize when width attribute changes', ->
      element.setAttribute "width", ""


   it 'should resize when height attribute changes', ->
      element.setAttribute "height", ""


   it 'should scale the model when scale attribute changes', ->
      element.setAttribute "scale", ""







