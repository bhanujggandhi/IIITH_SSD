from collections import deque
from datetime import datetime


matgrid = []
timestamps = []

with open("reading.txt") as f:
    lines = f.readlines()
    tempmat = []
    i = 0
    n = len(lines)
    tot = 0
    for line in lines:
        tot += 1
        if line == "\n" or tot == n+1:
            if len(tempmat) == 0:
                continue
            matgrid.append(tempmat)
            tempmat = []
            i = 0
        else:
            arr = line.split("\t")
            if i == 21:
                timestamps.append(arr[0])
            i += 1
            arr.pop()
            tempmat.append(arr[1:])


def countfootonmat(grid: list[list[str]]) -> int:
    n = len(grid)
    m = len(grid[0])
    visited = [[0 for j in range(m)]for i in range(n)]
    c = 0
    l = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for i in range(n):
        for j in range(m):
            if visited[i][j] == 0 and grid[i][j] != '0':
                q = deque()
                q.append((i, j))
                c += 1
                visited[i][j] = 1
                while q:
                    row, col = q.popleft()
                    for x, y in l:
                        nrow, ncol = row+x, col+y
                        if 0 <= nrow < n and 0 <= ncol < m and grid[nrow][ncol] != '0' and visited[nrow][ncol] == 0:
                            visited[nrow][ncol] = 1
                            q.append((nrow, ncol))
    return c


def maxpressure(grid: list[list[str]]) -> int:
    best = 0

    visited = [[False] * len(grid[0]) for _ in grid]

    def bfs(start_y, start_x) -> int:
        if visited[start_y][start_x] or int(grid[start_y][start_x]) == 0:
            return 0
        area = 0

        q = deque([(start_y, start_x)])

        while q:
            y, x = q.popleft()

            if visited[y][x]:
                continue
            else:
                visited[y][x] = True
            area += 1
            for dy, dx in ((1, 0), (0, 1), (-1, 0), (0, -1)):
                if 0 <= dy + y < len(grid) and 0 <= dx + x < len(grid[0]) and int(grid[y + dy][x + dx]) != 0:
                    q.append((y + dy, x + dx))

        return area

    for i in range(len(grid)):
        for j in range(len(grid[0])):
            best = max(best, bfs(i, j))

    return best


footdata = []

for i in matgrid:
    nooffeet = countfootonmat(i)
    intensityoffeet = maxpressure(i)
    footdata.append([nooffeet, intensityoffeet])

flag = False
left = []
right = []

temp = [0, 0, 0]
for i in range(len(footdata)+1):
    if (i == len(footdata) or footdata[i][0] > 1):
        if flag == False:
            left.append(temp)
        else:
            right.append(temp)
        flag = not flag
        temp = [0, 0, 0]
    else:
        if (temp[2] < footdata[i][1]):
            temp[0] = i
            temp[1] = footdata[i][0]
            temp[2] = footdata[i][1]

for i in left:
    ind = -1
    f = False
    matrix = matgrid[i[0]]
    for row in range(len(matrix)):
        for col in range(len(matrix[0])):
            if (int(matrix[row][col]) != 0):
                ind = row
                f = True
                break
        if f == True:
            i.append(ind)
            break

for i in right:
    ind = -1
    f = False
    matrix = matgrid[i[0]]
    for row in range(len(matrix)):
        for col in range(len(matrix[0])):
            if (int(matrix[row][col]) != 0):
                ind = row
                f = True
                break
        if f == True:
            i.append(ind)
            break

stridelen = 0
timediff = 0

if (len(left) >= 2):
    stridelen = abs(left[1][3] - left[0][3])
    t1 = datetime.strptime(timestamps[left[0][0]], '%H:%M:%S.%f')
    t2 = datetime.strptime(timestamps[left[1][0]], '%H:%M:%S.%f')
    t3 = t2-t1
    timediff = t3.total_seconds()
elif (len(right) >= 2):
    stridelen = abs(right[0][3] - right[1][3])
    t1 = datetime.strptime(timestamps[right[0][0]], '%H:%M:%S.%f')
    t2 = datetime.strptime(timestamps[right[1][0]], '%H:%M:%S.%f')
    t3 = t2-t1
    timediff = t3.total_seconds()


print("Stride Length:", stridelen)
print("Stride Velocity:", stridelen/timediff, "length per second")
print("Cadence:", int(((len(left) + len(right))*60)/timediff))
