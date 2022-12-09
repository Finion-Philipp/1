import * as fs from "fs";

const inputFile = "./9/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

// TYPES & INTERFACES

type Position = {
	x: number;
	y: number;
};

type Direction = "U" | "D" | "L" | "R";

type Move = {
	direction: Direction;
	steps: number;
};

// FUNCTIONS

function parseLineToMove(line: string): Move {
	const tokens = line.split(" ");
	return { direction: tokens[0] as Direction, steps: Number(tokens[1]) };
}

function makeMove(move: Move) {
	for (let i = 0; i < move.steps; i++) {
		moveOneStep(move.direction);
	}
}

function moveOneStep(direction: Direction) {
	switch (direction) {
		case "U":
			head.y++;
			break;
		case "D":
			head.y--;
			break;
		case "L":
			head.x--;
			break;
		case "R":
			head.x++;
			break;
	}
	moveTail(direction);
}

function moveTail(headDirection: Direction) {
	if (tailTouchesHead()) {
		return;
	}
	switch (headDirection) {
		case "U":
			tail.y++;
			tail.x = head.x;
			break;
		case "D":
			tail.y--;
			tail.x = head.x;
			break;
		case "L":
			tail.x--;
			tail.y = head.y;
			break;
		case "R":
			tail.x++;
			tail.y = head.y;
			break;
	}
	saveTailPosition();
}

function tailTouchesHead(): boolean {
	const absX = Math.abs(head.x - tail.x);
	const absY = Math.abs(head.y - tail.y);
	return absX <= 1 && absY <= 1;
}

function saveTailPosition() {
	tailPositions.push(JSON.stringify(tail));
}

// PARSING

const head: Position = { x: 0, y: 0 };
const tail: Position = { x: 0, y: 0 };
const tailPositions: Array<string> = [];
saveTailPosition();

lines.forEach((line, yIndex) => {
	makeMove(parseLineToMove(line));
});

console.log(`result1: ${new Set(tailPositions).size}`);
