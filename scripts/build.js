var exec = require('shelljs').exec
var echo = require('shelljs').echo
var fs = require('fs');
//use paths, so libs don't need a -g
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/.bin/derequire';
var terser = './node_modules/.bin/terser';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

//final build locations
var banner = '/* half-past v' + pkg.version + '\n   github.com/spencermountain/half-past\n   MIT\n*/\n';
var uncompressed = './builds/half-past.js';
var compressed = './builds/half-past.min.js';

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
echo(banner).to(uncompressed);

//browserify + derequire
var cmd = browserify + ' ./src/index.js --standalone halfPast';
cmd += ' -t [ babelify --presets [ @babel/preset-env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + uncompressed;
exec(cmd);


//uglify
cmd = terser + ' ' + uncompressed + ' --mangle --compress ';
cmd += ' >> ' + compressed;
exec(cmd);

//print filesizes
var stats = fs.statSync(compressed);
var fileSize = (stats['size'] / 1000.0).toFixed(2);
console.log('\n\n main: ' + fileSize + 'kb');
