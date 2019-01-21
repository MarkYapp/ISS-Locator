<h1>International Space Station Locator</h1>

Live app: https://markyapp.github.io/ISS-Locator/

<h3>Summary</h3>
<p>This app allows users to view the current location and trajectory of the International Space Station (ISS) on a world map, change the zoom level of the map, and view current statistics about the ISS by clicking on its icon.</p>
<p>It works by making a fetch call every 2 seconds to the https://api.wheretheiss.at/v1/satellites/25544 API, then displaying a Leaflet map centered around the coordinates of the fetch response promise.</p>

<h3>Screenshot</h3>

![screenshot of the iss-locator app](https://github.com/MarkYapp/ISS-Locator/blob/master/iss-locator-screenshot.png)

<h3>Built with:</h3>
<ul>
  <li>JavaScript</li>
  <li>jQuery</li>
  <li>HTML</li>
  <li>CSS</li>
</ul>
