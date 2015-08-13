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
      var elem = line.trim().split(' ');
      if (line.indexOf("propdump version") == 0) return;
      if (elem.length != 14) return;
      objs.push({
        owner: parseInt(elem[0]),
	modified: parseInt(elem[1]) * 1000,
	x: parseInt(elem[2]),
	y: parseInt(elem[3]),
	z: parseInt(elem[4]),
	yaw: parseInt(elem[5]),
	tilt: parseInt(elem[6]),
	roll: parseInt(elem[7]),
	type: types[parseInt(elem[8])],
	model: elem[13]
      });
    });
    app.models.object.create(objs, function(err,data) {
      if (err) throw err;
      console.log('Created ', data.length, ' objects\n');
    });
  });
}
