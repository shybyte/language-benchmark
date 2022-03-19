const std = @import("std");

extern fn time() void;
extern fn timeEnd() void;

const MAX_AUTHORS = 10_000;
const LINES = 250_000_000;

const ArrayList = std.ArrayList;
const allocator = std.heap.page_allocator;

fn range(len: usize) []const u0 {
    return @as([*]u0, undefined)[0..len];
}

fn main() anyerror!void {
    // var array: [3]u32 = undefined;
    // var array = std.mem.zeroes([MAX_AUTHORS]u32);

    var linesByAuthor = ArrayList(u32).init(allocator);
    try linesByAuthor.ensureTotalCapacityPrecise(MAX_AUTHORS);
    linesByAuthor.items.len = MAX_AUTHORS;
    std.mem.set(u32, linesByAuthor.items, 0);
    std.log.info("All your codebase are belong to us {} {}", .{ linesByAuthor.items.len, linesByAuthor.items[MAX_AUTHORS - 1] });

    var lines = ArrayList(u16).init(allocator);
    try lines.ensureTotalCapacityPrecise(LINES);
    for (range(LINES)) |_, i| {
        try lines.append(@intCast(u16, i % MAX_AUTHORS));
    }

    time();
    for (lines.items) |author| {
        linesByAuthor.items[author] += 1;
    }
    timeEnd();
}

export fn blame() void {
    if (main()) |_| {
    } else |_| {
    }
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
