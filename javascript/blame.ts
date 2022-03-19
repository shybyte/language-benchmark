/* ------------------ Input -------------------------- */

export interface BlameInput {
  rootNodes: FileSystemNode[];
}

export interface FolderNode {
  name: string;
  children: FileSystemNode[];
}

export interface FileNode {
  name: string;
  lines: FileLine[];
}

export interface FileLine {
  author: string;
  authorIndex: number;
  timestamp: number;
}

export interface FileNode2 {
  name: string;
  lines: Uint16Array;
}

export type FileSystemNode = FolderNode | FileNode;

/* ------------------ Output -------------------------- */

interface BlameOutput {
  linesByAuthor: unknown;
}

function createArray<T>(length: number, map: (i: number) => T): T[] {
  return Array.from({ length }, (_, index) => map(index));
}

const authors = createArray(10_000, (i) => i.toString());

function createFileNode(name: string, fileLines: number): FileNode {
  const lines: FileLine[] = createArray(fileLines, (i) => ({
    author: authors[i % authors.length],
    authorIndex: i,
    timestamp: i,
  }));
  return { name, lines };
}

function createFileNode2(name: string, fileLines: number): FileNode2 {
  const lines = new Uint16Array(fileLines);
  for (let i = 0; i < fileLines; i++) {
    lines[i] = i;
  }
  return { name, lines };
}

function createTestData(depth: number, width: number, fileLines: number, authorCount: number): BlameInput {
  function createNodeInternal(name: string, currentDepth: number): FileSystemNode {
    if (currentDepth < depth) {
      return {
        name,
        children: createArray(width, (i) => createNodeInternal(i.toString(), currentDepth + 1)),
      };
    } else {
      return createFileNode(name, fileLines);
    }
  }

  return {
    rootNodes: createArray(width, (i) => createNodeInternal(i.toString(), 0)),
  };
}

// const fileNodes = createArray(25_000, (i) => createFileNode(i.toString(), 1000));
const fileNodes2 = createArray(25_000, (i) => createFileNode2(i.toString(), 1000));

// console.log("testData:", JSON.stringify(fileNodes, null, 2));

function blame(fileNodes: FileNode[]): BlameOutput {
  const linesByAuthor: Record<string, number> = {};
  for (const fileNode of fileNodes) {
    for (const line of fileNode.lines) {
      linesByAuthor[line.author] = (linesByAuthor[line.author] ?? 0) + 1;
    }
  }
  return {
    linesByAuthor: linesByAuthor,
  };
}

function blameMap(fileNodes: FileNode[]): BlameOutput {
  const linesByAuthor: Map<string, number> = new Map();
  for (const fileNode of fileNodes) {
    for (const line of fileNode.lines) {
      linesByAuthor.set(line.author, (linesByAuthor.get(line.author) ?? 0) + 1);
    }
  }
  return {
    linesByAuthor: linesByAuthor,
  };
}

function blameIndex(fileNodes: FileNode[]): BlameOutput {
  const linesByAuthor: Array<number> = new Array<number>(authors.length);
  for (const fileNode of fileNodes) {
    for (const line of fileNode.lines) {
      linesByAuthor[line.authorIndex] = (linesByAuthor[line.authorIndex] ?? 0) + 1;
    }
  }
  return {
    linesByAuthor: linesByAuthor,
  };
}

function blameIndexTyped(fileNodes: FileNode[]): BlameOutput {
  const linesByAuthor = new Uint32Array(authors.length);
  for (const fileNode of fileNodes) {
    // for (const line of fileNode.lines) {
    //   linesByAuthor[line.authorIndex] = linesByAuthor[line.authorIndex] + 1;
    // }
    for (let i = 0; i < fileNode.lines.length; i++) {
      const line = fileNode.lines[i];
      linesByAuthor[line.authorIndex] = linesByAuthor[line.authorIndex] + 1;
    }
  }
  return {
    linesByAuthor: linesByAuthor,
  };
}

function blameIndexTyped2(fileNodes: FileNode2[]): BlameOutput {
  const linesByAuthor = new Uint32Array(authors.length);
  for (const fileNode of fileNodes) {
    // for (const author of fileNode.lines) {
    //   linesByAuthor[author] = linesByAuthor[author] + 1;
    // }

    for (let i = 0; i < fileNode.lines.length; i++) {
      const line = fileNode.lines[i];
      linesByAuthor[line] = linesByAuthor[line] + 1;
    }
  }
  return {
    linesByAuthor: linesByAuthor,
  };
}

export function waitMs(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function run() {
  const numberOfRuns = 10;
  let timeSum = 0;
  for (let i = 0; i < numberOfRuns; i++) {
    const startTime = Date.now();
    // const result = blame(fileNodes);
    const result = blameIndexTyped2(fileNodes2);
    // console.log("result", result);
    const neededTime = Date.now() - startTime;
    console.log("neededTime", neededTime);
    timeSum += neededTime;
    await waitMs(1);
  }
  const meanTime = timeSum / numberOfRuns;
  console.log("meanTime", meanTime);
}

run();
