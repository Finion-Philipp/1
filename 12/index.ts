import * as fs from "fs";

const inputFile = "./12/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

// TYPES & INTERFACES

interface Node {
	x: number;
	y: number;
	elevation: number;
	distance: number;
	previousNode: Node | undefined;
	isStart: boolean;
	isEnd: boolean;
}

// PARSING

function toElevation(str: string): number {
	switch (str) {
		case "S":
			return 0;
		case "E":
			return 24;
		default:
			return str.charCodeAt(0) - 97;
	}
}
const field: Array<Array<Node>> = [];
lines.forEach((line, yIndex) => {
	field.push(
		Array.from(line).map((it, xIndex) => {
			return {
				x: xIndex,
				y: yIndex,
				elevation: toElevation(it),
				distance: Number.MAX_SAFE_INTEGER,
				previousNode: undefined,
				isStart: it === "S",
				isEnd: it === "E",
			};
		})
	);
});

let start: Node = field
	.find((it) => it.findIndex((ot: Node) => ot.isStart) !== -1)
	?.find((et) => et.isStart)!!;
start.distance = 0;
const end: Node = field
	.find((it) => it.findIndex((ot: Node) => ot.isEnd) !== -1)
	?.find((et) => et.isEnd)!!;

// PART 1

function findSurroundingNodes(node: Node): Array<Node> {
	const nodes = [];
	if (
		isInField(node.x + 1, node.y) &&
		canMove(node, field[node.y][node.x + 1])
	) {
		nodes.push(field[node.y][node.x + 1]);
	}
	if (
		isInField(node.x - 1, node.y) &&
		canMove(node, field[node.y][node.x - 1])
	) {
		nodes.push(field[node.y][node.x - 1]);
	}
	if (
		isInField(node.x, node.y + 1) &&
		canMove(node, field[node.y + 1][node.x])
	) {
		nodes.push(field[node.y + 1][node.x]);
	}
	if (
		isInField(node.x, node.y - 1) &&
		canMove(node, field[node.y - 1][node.x])
	) {
		nodes.push(field[node.y - 1][node.x]);
	}
	return nodes;
}

function isInField(x: number, y: number): boolean {
	return x >= 0 && x < field[0].length && y >= 0 && y < field.length;
}

function canMove(from: Node, to: Node): boolean {
	return from.elevation >= to.elevation || to.elevation - from.elevation === 1;
}

function findWayRec(cur: Node, prev?: Node) {
	if (cur === start && !prev) {
		findSurroundingNodes(cur).forEach((node) => findWayRec(node, cur));
	} else if (prev && prev.distance + 1 < cur.distance) {
		cur.distance = prev.distance + 1;
		cur.previousNode = prev;
		if (cur.isEnd) {
			return;
		}
		findSurroundingNodes(cur)
			.filter((it) => it !== prev)
			.forEach((node) => findWayRec(node, cur));
	}
}

findWayRec(start);
console.log(end.distance);

// PART 2

function cleanUp() {
	field.forEach((line) =>
		line.forEach((it) => {
			it.distance = Number.MAX_SAFE_INTEGER;
			it.previousNode = undefined;
		})
	);
}

function findWayRecWithStart(newStart: Node): number {
	start = newStart;
	cleanUp();
	start = newStart;
	start.distance = 0;
	findWayRec(newStart);
	return end.distance;
}

const result2: Array<number> = [];
field
	.flatMap((it) => it.filter((ot) => ot.elevation === 0))
	.forEach((it) => result2.push(findWayRecWithStart(it)));

console.log(Math.min(...result2));
