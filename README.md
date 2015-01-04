[![NPM](https://nodei.co/npm/gltf-viewer-element.png?downloads=true&stars=true)](https://nodei.co/npm/gltf-viewer-element/)

# &lt;gltf-viewer&gt;

A web component to load and render 3D assets in the [glTF](https://github.com/KhronosGroup/glTF/tree/v0.6) file format (v0.6).


Attributes
-----------
|**src** |
| :------ |
The URL of the asset to load

|**width** | default: '320px' |
| :------ | ------: |
CSS measurement of the width of viewer on the page

|**height** | default: '240px' |
| :------ | ------: |
CSS measurement of the height of viewer on the page

|**controls** | default: 'TrackballControls' |
| :------ | ------: |
Name of the scene interaction method

|**scale** | default: '0.002' |
| :------ | ------: |
Factor applied to size the imported scene


Events
-------
|**progress-state-change** |
| :------ |

Fired for updates to loading state before the asset has been fully loaded

|**progress-state-ready** |
| :------ |

Fired when asset has been fully loaded

Usage
------
```
<gltf-viewer src="duck.json"></gltf-viewer>
```


Running Tests
--------------
Install the development dependencies:

    $ npm install
    $ bower install

Then run the tests:

    $ npm test


## License

Copyright (c) 2014 Christopher Brandt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
