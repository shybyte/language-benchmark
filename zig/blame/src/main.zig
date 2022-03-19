const std = @import("std");

const MAX_AUTHORS = 10_000;
const LINES = 250_000_000;

const ArrayList = std.ArrayList;
const allocator = std.heap.page_allocator;

pub fn range(len: usize) []const u0 {
    return @as([*]u0, undefined)[0..len];
}

pub fn main() anyerror!void {
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

    var startTime = std.time.milliTimestamp();
    for (lines.items) |author| {
        linesByAuthor.items[author] +=1;
    }
    var duration = std.time.milliTimestamp() - startTime;
    
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Duration: {} \n", .{duration});
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
