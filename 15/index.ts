import * as fs from "fs";

const inputFile = "./15/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

// TYPES & INTERFACES

type Position = {
	x: number;
	y: number;
};

lines.forEach((line) => console.log(line));
