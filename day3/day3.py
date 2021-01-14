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


def partTwo(field, slopes):
    totalTrees = 1
    for slope in slopes:
        right = slope[0]
        down = slope[1]

        totalTrees *= findTrees(field, right, down)
    return totalTrees


restofSlopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

# print(findTrees(input, 3, 1))
print(partTwo(input, restofSlopes))
