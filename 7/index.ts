import * as fs from "fs";

const inputFile = "./7/input";

const lines = fs.readFileSync(inputFile, "utf8").split(/\r?\n/);

interface Files {
	[index: string]: number;
}
interface Directory {
	name: string;
	files: Files;
	subDirs: Array<Directory>;
	parent?: Directory;
	directSize: number;
	indirectSize: number;
	isLeafDirectory: boolean;
}

function cd(target: string) {
	switch (target) {
		case "..": {
			if (currentDir.parent) {
				currentDir = currentDir.parent;
			} else {
				console.log(`cannot .. from ${currentDir.name}, no parent`);
			}
			break;
		}
		case "/": {
			currentDir = root;
			break;
		}
		default: {
			currentDir = createDirectory(target, currentDir);
		}
	}
}

function ls(command: Array<string>) {
	switch (command[0]) {
		case "dir": {
			createDirectory(command[1], currentDir);
		}
	}
}

function createDirectory(name: string, parent: Directory): Directory {
	let newDir = currentDir.subDirs.find((dir) => dir.name === name);
	if (newDir === undefined) {
		newDir = {
			name,
			files: {},
			subDirs: [],
			parent,
			directSize: 0,
			indirectSize: 0,
			isLeafDirectory: true,
		};
		parent.subDirs.push(newDir);
		parent.isLeafDirectory = false;
		allDirs.push(newDir);
	}
	return newDir;
}

function createFile(name: string, size: number) {
	currentDir.files[name] = size;
}

function calculateDirectSize(dir: Directory): number {
	return Object.values(dir.files).reduce((a, b) => a + b, 0);
}

function calculateSizesRec(dir: Directory, childSize: number) {
	dir.directSize = calculateDirectSize(dir);
	dir.indirectSize += childSize;
	dir.indirectSize += dir.directSize;
	if (dir.parent) {
		calculateSizesRec(dir.parent, dir.indirectSize);
	}
}

function printDir(dir: Directory, indent: string) {
	console.log(`${indent}-${dir.name} ${dir.indirectSize}`);
	Object.keys(dir.files).forEach((filename) =>
		console.log(`${indent}*${filename} ${dir.files[filename]}`)
	);
	dir.subDirs.forEach((subdir) => printDir(subdir, ` ${indent}`));
}

const root: Directory = {
	name: "/",
	files: {},
	subDirs: [],
	parent: undefined,
	directSize: 0,
	indirectSize: 0,
	isLeafDirectory: true,
};
const allDirs = [root];
let currentDir = root;

lines.forEach((line) => {
	let splitLine = line.split(" ");
	// console.log(line);
	switch (splitLine[0]) {
		case "$": {
			if (splitLine[1] === "cd") cd(splitLine[2]);
			break;
		}
		case "dir": {
			createDirectory(splitLine[1], currentDir);
			break;
		}
		default: {
			createFile(splitLine[1], Number(splitLine[0]));
		}
	}
});

root.directSize = calculateDirectSize(root);

allDirs
	.filter((dir) => dir.isLeafDirectory)
	.forEach((dir) => calculateSizesRec(dir, 0));

// printDir(root, "");

const result1 = allDirs
	.filter((dir) => dir.indirectSize <= 100000)
	.map((dir) => dir.indirectSize)
	.reduce((a, b) => a + b);

console.log(`result 1: ${result1}`);
