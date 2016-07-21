// creates a haiku based on a given structure and list of words organized by syllables
function createHaiku(structure, syllablesArr){
    var haiku = [];
    for (var i = 0; i < structure.length; i++) {
    	var line = [];
    	for (var j = 0; j < structure[i].length; j++) {
    		var syllables = structure[i][j];
    		var word = chooseWord(syllables, syllablesArr);
    		line.push(word);
    	}
    	haiku.push(line.join(' '));
    }
    console.log('\n' + haiku.join('\n') + '\n');
}


// generates random integer between min (inclusive) and max (inclusive)
// taken from the javascript reference page for Math.random()
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// chooses a word from a list based on how many syllables are wanted
function chooseWord(syllables, syllablesArr) {
	var wordChoices = syllablesArr[syllables];
	var random = getRandomInt(0, wordChoices.length-1); //getrandint's max is inclusive
	return wordChoices[random];
}

// splits dictionary into an object containing arrays of words indexed by # of syllables
function splitBySyllables(dict) {
	var output = {};
	var words = dict.split('\n');
	for (var i = 0; i < words.length; i++) {
		var split = words[i].split('  ');
		var word = split[0];
		if (word.match(/(\d)/)) {continue;} // skip the repeat words followed by (#)

		var phonemes = split[1].split(' ');
		var syllables = 0;
		for (var j = 0; j < phonemes.length; j++)
			if (phonemes[j].match(/\d/)) {syllables++;}

		if (output[syllables] === undefined) {output[syllables] = [];}
		output[syllables].push(word);
	}
	return output;
}

// generates the structure for the haiku
function makeStructure() {
	var basicStruct = [5, 7, 5];
	var complexStruct = [[],[],[]];
	for (var line in complexStruct) {
		var syllablesInLine = basicStruct[line];
		var wordsInLine = getRandomInt(1, 4); //set rather arbitrarily...
		var minSyllablesPerWord = Math.floor(syllablesInLine/wordsInLine);
		for (var i = 0; i < wordsInLine; i++)
			complexStruct[line].push(minSyllablesPerWord)
		var extraSyllables = syllablesInLine - (minSyllablesPerWord * wordsInLine);
		complexStruct[line][getRandomInt(0, wordsInLine-1)] += extraSyllables;
	}
	return complexStruct;
}


module.exports = {
	createHaiku: createHaiku,
	splitBySyllables: splitBySyllables,
	makeStructure: makeStructure
};