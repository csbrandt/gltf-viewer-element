element = document.querySelector 'gltf-viewer'

debugger

describe '<gltf-viewer>', ->
   describe 'WebGL', ->
      it 'should be enabled', ->
         expect(Detector.webgl).to.be.true

   describe 'element', ->
      it 'should exist', ->
      expect(element).to.be.a('object')

   it 'should update model when src attribute changes', ->
      element.setAttribute "src", "duck.json"

   it 'should throw progress-state-ready after asset is loaded', (done) ->
      element.addEventListener 'progress-state-ready', ->
         done()


   ###
   it 'should throw progress-state-change while loading asset', (done) ->
      progressDone = ->
         done()

      progressCB = sinon.spy(progressDone)

      element.addEventListener 'progress-state-change', progressCB

      expect(progressCB).to.have.been.called
   ###

   it 'should resize when width attribute changes', ->
      element.setAttribute "width", "600px"

   it 'should resize when height attribute changes', ->
      element.setAttribute "height", "400px"

