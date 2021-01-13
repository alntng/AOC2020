input = open('dayOneInput.txt', 'r')
test = open('day1test.txt', 'r')

input = map(int, input)
test = map(int, test)
# print(len(input))


def twoSum(nums):
    seen = dict()
    for num in nums:
        diff = 2020 - num
        if num not in seen.values():
            seen[diff] = num
        if diff in seen.values():
            return num * diff


print(twoSum(test))
