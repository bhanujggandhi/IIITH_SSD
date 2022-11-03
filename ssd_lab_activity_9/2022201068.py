from csv import writer, reader

# Read the CSV File Provided & drop the last 6 columns.


def q1(inpfilename, outfilename):
    with open(inpfilename, "r") as source:
        fileread = reader(source)

        with open(outfilename, "w") as destination:
            filewrite = writer(destination)
            for r in fileread:
                filewrite.writerow((r[0], r[1], r[2], r[3], r[4], r[5], r[6]))

#  Drop all the rows with negative %change of more than 3% using filter & lambda function


def q2(path):
    with open(path) as f:
        lines = f.readlines()
        res = []
        res.append(lines[0])
        lines.pop(0)
        res1 = list(filter(lambda x: float(
            x.split(',')[-1].replace("\n", "")) >= -3, lines))
    with open('stock_output.csv', 'w') as f:
        f.writelines(res)
        f.writelines(res1)


# Calculate average of Open, high, low for all the remaining columns using map & lambda function.
def q3(inpfilename, outfilename):
    with open(inpfilename) as f:
        lines = reader(f, delimiter=',')
        res = []
        res1 = []
        openlis = []
        highlis = []
        lowlis = []
        for line in lines:
            if(line[1] == "Open"):
                continue
            openlis.append(line[1])
            highlis.append(line[2])
            lowlis.append(line[3])

        n_lines = list(map(lambda x: float(x.replace(",","")), openlis))
        res.append([sum(n_lines) / len(n_lines)])
        
        k_lines = list(map(lambda x: float(x.replace(",","")), highlis))
        res.append([sum(k_lines) / len(k_lines)])
        l_lines = list(map(lambda x: float(x.replace(",","")), lowlis))
        res.append([sum(l_lines) / len(l_lines)])


    with open(outfilename, 'w') as f:
        wr = writer(f);
        wr.writerows(res) 

def q4(path, outpath):
    with open(path) as f:
        lines = f.readlines()
        res = []
        res.append(lines[0])
        lines.pop(0)
        print("Please enter a character to search")
        inp = input()
        res1 = list(filter(lambda x: float(
            x.split(',')[-1].replace("\n", "")) >= -3, lines))
        res2 = []
        for i in res1:
            if i[0] == inp:
                res2.append(i)

    with open(outpath, 'w') as f:
        f.writelines(res2)

q1("lab_11_data.csv", "stock_output.csv")
q2("stock_output.csv")
q3("stock_output.csv", "avg_output.txt")
q4("stock_output.csv", "stock_output.txt")
