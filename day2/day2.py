input = open('dayTwoInput.txt', 'r')


def validPasswords(passwords):
    count = 0
    for password in passwords:
        rules = password.split(':')
        char = rules[0][-1]
        limits = rules[0][0:-1].split('-')
        min = int(limits[0])
        max = int(limits[1])
        string = rules[1].strip()

        charCount = 0
        for curr in string:
            if curr == char:
                charCount += 1

        # # part 1
        # if charCount >= min and charCount <= max:
        #     count += 1

        # part 2
        idx1 = min - 1
        idx2 = max - 1
        if (string[idx1] == char and string[idx2] != char) or string[idx1] != char and string[idx2] == char:
            count += 1
    return count


print(validPasswords(input))
