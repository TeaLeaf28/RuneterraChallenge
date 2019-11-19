from sklearn.cluster import KMeans
import cv2
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

image = cv2.imread(sys.argv[1])
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Image must be reshaped from 3D numpy array to a list of pixels for each channel of color
image = image.reshape((image.shape[0] * image.shape[1]), 3)

numColors = 3
clt = KMeans(numColors).fit(image)

hist = centroid_percents(clt)
processedColors = { 'percents': [], 'colors': [] }
for (percent, color) in zip(hist, clt.cluster_centers_):
    # Color (in the form of numpy array) must be made into a list in order to make processedColors into JSON format
    colorList = color.tolist()
    processedColors['percents'].append(percent)
    processedColors['colors'].append(colorList)

processedColorsJSON = json.dumps(processedColors)
print(processedColorsJSON)