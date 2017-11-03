function addMap () {
    map.addSource('some id', {
        type: 'geojson',
        data: 'water.geojson'
    });
}
document.onload = addMap;