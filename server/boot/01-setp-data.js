module.exports = function(app) {
  // XXX Code below is only for early debugging purposes.
  // XXX It only works with recent (AW5+?) propdumps
  // XXX also assumes no description or action (yet)
  // See http://wiki.activeworlds.com/index.php?title=Propdump
  // for details on format of file read.
  fs = require('fs');
  fs.readFile('tests/data/propdump-small.txt', 'utf8', function (err,data) {
    if (err) throw err;
 
    var objs = [];
    var types = ["Object", "Camera", "Zone", "ParticleEmitter", "Mover"];
    data.split('\n').forEach(function (line) {
      // Skip comment lines (XXX probably only supported by us!)
      if (line[0] == '#') return;
      // Skip propdump version line for now
      if (line.indexOf("propdump version") == 0) return;
      // split at space for first bunch of elements
      var elem = line.trim().split(' ');
      // Forget it if the line doesn't have enough elements
      if (elem.length < 14) return;
      // Rejoin from 13 on since that should be a continuous string
      // (which can contain spaces)
      var str = elem.slice(13).join(' ');
      objs.push({
        owner: parseInt(elem[0]),
	modified: parseInt(elem[1]) * 1000,
	x: parseFloat(elem[2]) / 1000,
	y: parseFloat(elem[3]) / 1000,
	z: parseFloat(elem[4]) / 1000,
	yaw: parseInt(elem[5]) / 10,
	tilt: parseFloat(elem[6]) / 10,
	roll: parseFloat(elem[7]) / 10,
	type: types[parseInt(elem[8])],
	model: str.substr(0, parseInt(elem[9])),
      });
    });
    app.models.object.create(objs, function(err,data) {
      if (err) throw err;
      console.log('Created ', data.length, ' objects\n');
    });
  });
}
