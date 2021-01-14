with open('dayThreeInput.txt') as f:
    input = f.read().splitlines()


def findTrees(field, right, down):
    row = 0
    col = 0
    treeCount = 0
    while row < len(field):
        if(field[row][col] == '#'):
            treeCount += 1
        col = (col + right) % len(field[0])
        row += down
    return treeCount


print(findTrees(input, 3, 1))
