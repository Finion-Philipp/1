import * as fs from "fs";

const inputFile = "./8/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

// TYPES & INTERFACES

type Position = {
	x: number;
	y: number;
};

// FUNCTIONS

function initArrays() {
	const sizeX = lines[0].length;
	const sizeY = lines.length;

	for (let x = 0; x < sizeX; x++) {
		cols.push([]);
	}
	for (let y = 0; y < sizeY; y++) {
		rows.push([]);
	}
}

function canBeSeen(pos: Position): boolean {
	return (
		isAtBorder(pos) ||
		canBeSeenInLine(pos.x, rows[pos.y]) ||
		canBeSeenInLine(pos.y, cols[pos.x])
	);
}

function canBeSeenInLine(pos: number, line: Array<number>): boolean {
	return (
		Math.max(...line.slice(0, pos)) < line[pos] ||
		Math.max(...line.slice(pos + 1)) < line[pos]
	);
}

function isAtBorder(pos: Position): boolean {
	return (
		pos.x === 0 ||
		pos.y === 0 ||
		pos.x === cols.length - 1 ||
		pos.y === rows.length - 1
	);
}

// function calculateScenicScore(pos: Position): number {}
// function calculateScenicScoreInLine(pos: number, line: Array<number>): number {}

// PARSING

const rows: Array<Array<number>> = [];
const cols: Array<Array<number>> = [];

initArrays();
lines.forEach((line, yIndex) => {
	Array.from(line).forEach((tree, xIndex) => {
		rows[yIndex].push(Number(tree));
		cols[xIndex].push(Number(tree));
	});
});

// COUNTING TREES

let result1 = 0;

cols.forEach((col, xPos) => {
	col.forEach((_, yPos) => {
		if (canBeSeen({ x: xPos, y: yPos })) {
			result1++;
		}
	});
});

console.log(`result1: ${result1}`);

// CALCULATING SCENIC SCORE

const scores = [];
cols.forEach((col, xPos) => {
	col.forEach((_, yPos) => {
		if (canBeSeen({ x: xPos, y: yPos })) {
			result1++;
		}
	});
});
