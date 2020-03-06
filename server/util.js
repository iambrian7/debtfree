var fs = require('fs');
var path = require('path');

function getLocations(){
  console.time("locations");
  // var locations = getFile('data/nodupsLocations.json')
  var locations = getFile('data/non_geo_globalLocations.json')
  // var locations = getFile('data/globalLocations.json')
  var loc = JSON.parse(locations)
  console.log(`locations found: ${loc.length}`)
  console.timeEnd("locations");
  return loc;
}




  function getFile(dir,f) {
    var dir = path.join(__dirname+dir, f);
    try {
      const data = fs.readFileSync(dir, 'utf8');
      // console.log(data)
      return data;
    } catch (err) {
      console.error(err)
      return `error: ${err}`;
    }
  }// end of getFile

  // name is relative to where the util.js file is located
  // so "data/file.js" is at server/data/file.js
function writeFile(name, data) {
  console.log(`Writing File ${name} `);
  console.log(`__dirname = ${__dirname}`)
  fs.writeFile(name, data, (err) => {
      if (err) {
          return console.log(err);
      }
      console.log(`File ${name} saved successfully!`);
  })
} // end of writeFile

module.exports.getFile = getFile;
module.exports.writeFile = writeFile;