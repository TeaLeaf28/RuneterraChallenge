from sklearn.cluster import KMeans
import numpy as np
import sys
import json

# Obtains a histogram with the percentages for each cluster of colors
def centroid_percents(clt):
    numLabels = np.arange(len(np.unique(clt.labels_)) + 1)
    (hist, _) = np.histogram(clt.labels_, bins = numLabels)
    hist = hist.astype("float")
    hist /= hist.sum()
    return hist

strPercentColor = str(sys.argv[1])
percentColor = json.loads(strPercentColor)
#percentColor = { 'percentArr': [0.34099388122558594,0.2059307098388672,0.4530754089355469], 'colorArr': [[[132.09200674781374,99.4958063763206,73.839921117107],[231.6592624666568,209.34319891078837,168.76751444872554],[30.740684509927988,21.90420819782078,18.280513882557074]]]}
percentArr = np.array(percentColor['percentArr']);
colorArr = np.array(percentColor['colorArr']);

percentArr = percentArr * 5;
percentArr = np.round(percentArr)
percentArr = percentArr.astype("int")

numRow = 0
for num in percentArr:
    numRow += num

colors = np.zeros((numRow, 3))

current = 0;
for i in range(0, percentArr.size):
    for j in range(0, percentArr[i]):
        colors[current][0] = colorArr[int(i / 3)][i % 3][0]
        colors[current][1] = colorArr[int(i / 3)][i % 3][1]
        colors[current][2] = colorArr[int(i / 3)][i % 3][2]
        current += 1

clt = KMeans(5).fit(colors)

hist = centroid_percents(clt)
processedColors = { 'percents': [], 'colors': [] }
for (percent, color) in zip(hist, clt.cluster_centers_):
    # Color (in the form of numpy array) must be made into a list in order to make processedColors into JSON format
    colorList = color.tolist()
    processedColors['percents'].append(percent)
    processedColors['colors'].append(colorList)

processedColorsJSON = json.dumps(processedColors)
print(processedColorsJSON)