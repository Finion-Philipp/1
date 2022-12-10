import * as fs from "fs";

const inputFile = "./10/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

// TYPES & INTERFACES

let cycle = 0;
let x = 1;
let line = 0;
const interestingSignals: Array<number> = [];
const signal: Array<Array<string>> = [[], [], [], [], [], []];

function increaseCycle() {
	if ((cycle + 20) % 40 === 0) {
		interestingSignals.push(cycle * x);
	}
	if (cycle % 40 === 0) {
		line = Math.floor(cycle / 40);
	}
	drawCycle();

	cycle++;
}

function drawCycle() {
	signal[line].push(matchesSprite() ? "#" : ".");
}

function matchesSprite(): boolean {
	console.log(
		`comparing cycle ${cycle} and x ${x}: ${Math.abs((cycle % 40) - x) <= 1}`
	);
	return Math.abs((cycle % 40) - x) <= 1;
}

lines.forEach((line) => {
	const splitLine = line.split(" ");
	switch (splitLine[0]) {
		case "noop": {
			increaseCycle();
			break;
		}
		case "addx": {
			increaseCycle();
			increaseCycle();
			x += Number(splitLine[1]);
		}
	}
});

function drawLine(i: number) {
	let line = JSON.parse(JSON.stringify(signal[i]));
	let splitLine = [];
	let str = "";
	while (line.length > 5) {
		splitLine.push(line.splice(0, 5));
	}
	splitLine.forEach((line) => str.concat(` ${line.join("")}`));
	console.log(str);
}

console.log(`result1: ${interestingSignals.reduce((a, b) => a + b)}`);
console.log();
console.log(signal[0].join(""));
console.log(signal[1].join(""));
console.log(signal[2].join(""));
console.log(signal[3].join(""));
console.log(signal[4].join(""));
console.log(signal[5].join(""));

console.log();
console.log();

for (let j = 0; j < 6; j++) {
	drawLine(j);
}
