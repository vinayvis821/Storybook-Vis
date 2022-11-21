import sys

if len(sys.argv) != 2:
    print( "Usage: parse.py <filename>")
    exit()
argument = sys.argv[1]
# print(argument)
file = open( argument, "r" )
name = file.readline()
lines = []
for line in file:
    if len(line) != 1:
        line2 = ""
        for word in line:
            if word.isalpha() or word == " ":
                line2 = line2 + word
        lines.append(line2.strip())
        
words = []
# print( lines )
for line in lines:
    line = line.split( " ")
    for word in line:
        words.append(word)
# print(words)
argument = argument.replace(".txt", "")
newFileName = argument + "-parsed" + ".txt"
newFile = open( newFileName, "w")
newFile.write(str(words))