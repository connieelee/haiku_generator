var fs = require("fs");
var haiku = require('./helper');

var structure = haiku.makeStructure();
var cmudictFile = fs.readFileSync('./cmudict.txt').toString();
var syllablesArr = haiku.splitBySyllables(cmudictFile);

haiku.createHaiku(structure, syllablesArr);