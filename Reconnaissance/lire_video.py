import numpy as np
import cv2
 
cap = cv2.VideoCapture('video.avi')
while(cap.isOpened()):
    success, img = cap.read()
    #writer.write(img)
    #imgS = cv2.resize(img, (0, 0), fx=0.25, fy=0.25) # redimensionner pour garder les performances
    #imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    cv2.waitKey(1)
    cv2.imshow('Webcam',img)
    cv2.imwrite("pic.png", img)

