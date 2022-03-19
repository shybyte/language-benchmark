package main

import "core:fmt"
import "core:time"

// structs copy to proc?

AUTHOR_NUMBER :: 10_000

FileNode :: struct {
	name:  string,
	lines: [dynamic]u16,
}

createDummyFilesNodes :: proc() -> [dynamic]FileNode {
	result: [dynamic]FileNode
	for i in 0 ..< 250_000 {
		newFileNode: FileNode = FileNode{}
		newFileNode.name = fmt.aprint(i)
		for line in 0 ..< 1000 {
			append(&newFileNode.lines, u16(line % AUTHOR_NUMBER))
		}
		append(&result, newFileNode)
	}
	return result
}

blame :: proc(files: [dynamic]FileNode) {
	linesByAuthor := [AUTHOR_NUMBER]int{}
	for file in files {
		for author in file.lines {
			#no_bounds_check {
				linesByAuthor[author] += 1
			}
		}
	}
}

main :: proc() {
	fileNodes := createDummyFilesNodes()
	// fmt.println("fileNodes:", fileNodes)
	startTime := time.tick_now()
	blame(fileNodes)
	fmt.println("time:", time.tick_since(startTime))
	delete(fileNodes)
}
