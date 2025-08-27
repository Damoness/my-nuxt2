export function intervalToHoldDay(interval: string) {
    // 根据测试用例，我们需要处理以下几种格式：
    // 1. 'N＜7天' -> 返回 0
    // 2. '7天≤N＜30天' -> 返回 7
    // 3. '30天≤N＜365天' -> 返回 30
    // 4. '1年≤N＜2年' -> 返回 365
    // 5. 'N≥2年' -> 返回 730

    // 处理 'N＜x天' 格式，返回0
    if (interval.match(/^N<\d+天$/)) {
        return 0;
    }

    // 处理 'x天≤N<y天' 格式，返回x
    const dayRangeMatch = interval.match(/^(\d+)天≤N＜\d+天$/);
    if (dayRangeMatch) {
        return parseInt(dayRangeMatch[1]);
    }

    // 处理 'x年≤N<y年' 格式，返回x*365
    const yearRangeMatch = interval.match(/^(\d+)年≤N＜\d+年$/);
    if (yearRangeMatch) {
        return parseInt(yearRangeMatch[1]) * 365;
    }

    // 处理 'N≥x天' 格式，返回x
    const greaterEqualMatch1 = interval.match(/^N≥(\d+)天$/);
    if (greaterEqualMatch1) {
        return parseInt(greaterEqualMatch1[1]);
    }

    // 处理 'N≥x年' 格式，返回x*365
    const greaterEqualMatch2 = interval.match(/^N≥(\d+)年$/);
    if (greaterEqualMatch2) {
        return parseInt(greaterEqualMatch2[1]) * 365;
    }

    // 兜底，对于其他格式返回0
    return 0;
}
