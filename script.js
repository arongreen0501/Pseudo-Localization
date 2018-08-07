const map = {
	a: 'àáâãäåāăąǻȁȃ',
	A: 'ÀÁÂÃÄÅĀĂĄǺȀȂ',
	b: 'ƀƂƃƄƅɓ',
	B: 'ßƁɃʙ',
	c: 'ćĉċč',
	C: 'ĆĈĊČ',
	d: 'ďđ',
	D: 'ĎĐƉƊ',
	e: 'ēĕėęěȅȇ',
	E: 'ĒĔĖĘĚȄȆ',
	f: 'ƒ',
	F: 'Ƒ',
	g: 'ĝğġģ',
	G: 'ĜĞĠĢ',
	h: 'ĥħ',
	H: 'ĤĦ',
	I: 'ĨĪĬĮİ',
	i: 'ĩīĭįı',
	J: 'ĵ',
	j: 'Ĵ',
	K: 'ĶƘ',
	k: 'ķĸƙ',
	l: 'ĺļľŀł',
	L: 'ĹĻĽĿŁ',
	N: 'ŃŅŇŊƝ',
	n: 'ńņňŉŋƞ',
	o: 'ōŏőơ',
	O: 'ŌŎŐƠ',
	P: 'Ƥ',
	p: 'ƥƿþ',
	Q: 'ǪǬ',
	q: 'ǫǭɋ',
	r: 'ŕŗř',
	R: 'ŔŖŘƦ',
	S: 'ŚŜŞŠ',
	s: 'śŝşš',
	T: 'ŢŤŦ',
	t: 'ţťŧ',
	U: 'ŨŪŬŮŰŲ',
	u: 'ũūŭůűų',
	w: 'ŵ',
	W: 'Ŵ',
	Y: 'ŶŸƳȲɎ',
	y: 'ŷƴȳɏ',
	Z: 'ŹŻŽƵ',
	z: 'źżžƶ'
};

const explosionSymbols = ['one', 'two', 'three', 'four', 'five'];

function pseudoLocalization() {
	const allTextNodes = textNodesUnder(document.body);
	for (let textNode of allTextNodes) {
		let pseudoLocalizedText = '';
		for (let c of textNode.nodeValue) {
			if (map[c]) {
				pseudoLocalizedText += map[c][Math.floor(Math.random() * map[c].length)];
			} else pseudoLocalizedText += c;
		}

		const explodeRatio = 1.4;
		const explodedTextLength = Math.ceil(textNode.nodeValue.length * explodeRatio);
		let i = 0;
		while (pseudoLocalizedText.length < explodedTextLength) {
			pseudoLocalizedText += ' ' + explosionSymbols[i++];
		}

		textNode.nodeValue = '[' + pseudoLocalizedText + ']';
	}
}

const isAllWs = node => !/[^\t\n\r ]/.test(node.textContent);
// A comment node or a text node, all ws
const isIgnorable = node => node.nodeType == 8 || (node.nodeType == 3 && isAllWs(node));

function textNodesUnder(el) {
	let n;
	const a = [];
	const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, node => {
		if (isIgnorable(node)) return NodeFilter.FILTER_REJECT;
		return NodeFilter.FILTER_ACCEPT;
	});
	while ((n = walk.nextNode())) a.push(n);
	return a;
}

pseudoLocalization();
