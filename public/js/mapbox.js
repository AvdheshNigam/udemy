/* eslint-disabled */

export const displayMap = (locations) => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXZkaGVzaG5pZ2FtIiwiYSI6ImNrZDBjNHl6YjBrMGUyeHF2enI2NDRoeXkifQ.fIHtgZufrHt7W3blv12YQg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/avdheshnigam/ckd0ctxvy0dee1in8bcje7g79',
    scrollZoom:  false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div')
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    ancher: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to includes current locations
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
padding: {
    top: 200,
    right: 100,
    bottom: 150,
    left: 100
  }
});

map.on('mouseenter', 'places', function(e) {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';
   
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;
   
  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
   
  // Populate the popup and set its coordinates
  // based on the feature found.
  popup
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);
  });
   
  map.on('mouseleave', 'places', function() {
  map.getCanvas().style.cursor = '';
  popup.remove();
  });

  
  
// let isClicked = false
// marker.on({
//   mouseover: function() {
//       if(!isClicked) {
//           this.openPopup()
//       }
//   },
// });

// map.on ({
//   click: function() {
//       isClicked = false
//   },
//   popupclose: function () {
//       isClicked = false
//   }
// });
}
