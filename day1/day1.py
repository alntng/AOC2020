input = open('dayOneInput.txt', 'r')
test = open('day1test.txt', 'r')
input = map(int, input)
test = map(int, test)


def twoSum(nums):
    seen = dict()
    for num in nums:
        diff = 2020 - num
        if diff in seen.values():
            return num * diff
        elif num not in seen.values():
            seen[diff] = num


def threeSum(nums):
    sorted = nums.sort()
    for i in range(len(nums)):
        num = nums[i]
        left = i + 1
        right = len(nums) - 1
        while left < right:
            sum = num + nums[left] + nums[right]
            if sum == 2020:
                return num * nums[left] * nums[right]
            elif sum < 2020:
                left += 1
            elif sum > 2020:
                right -= 1


print(threeSum(input))
