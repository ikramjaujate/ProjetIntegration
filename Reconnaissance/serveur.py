# Welcome to PyShine

# This code is for the server 
# Lets import the libraries
import socket, cv2, pickle,struct,imutils


import face_recognition

import numpy as np
import os # pour importer toutes les images d'un coup
import datetime


path = './Reconnaissance/images'
images = []     # listes contenant toutes les images
className = []    # listes contenant toutes les nom de classe

myList = [x for x in os.listdir(path) if x.endswith('.jpg')]
#print(myList)
print("Nombre de classes détectées",len(myList))
for x,cl in enumerate(myList):
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        className.append(os.path.splitext(cl)[0])


#les encoder
def findEncodings(images):
    encodeList = []
    for img in images:
        #print(img)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)

    return encodeList


encodeListKnown = findEncodings(images)
print('Encodings Complete')

# capture vidéo
cap = cv2.VideoCapture(0)

# Convertir les resolutions 
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

out = cv2.VideoWriter('outpy.avi',cv2.VideoWriter_fourcc('M','J','P','G'), 10, (frame_width,frame_height))

# Socket Create
server_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
host_name  = socket.gethostname()
host_ip = socket.gethostbyname(host_name)
print('HOST IP:',host_ip)
port = 9999
socket_address = (host_ip,port)

# Socket Bind
server_socket.bind(socket_address)

# Socket Listen
server_socket.listen(5)
print("LISTENING AT:",socket_address)

# Socket Accept
while True:
	client_socket,addr = server_socket.accept()
	print('GOT CONNECTION FROM:',addr)
	if client_socket:
            success, img = cap.read()
            imgS = imutils.resize(img,width=320)
            #imgS = cv2.resize(img, (0, 0), fx=0.25, fy=0.25) # redimensionner pour garder les performances
            imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
            a= pickle.dumps(imgS)
            message = struct.pack("Q",len(a))+a
            facesCurFrame = face_recognition.face_locations(imgS)
            encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

            
            for encodeFace,faceLoc in zip(encodesCurFrame,facesCurFrame):
                matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
                faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)

                matchIndex = np.argmin(faceDis)
                

                if faceDis[matchIndex]< 0.50:
                    name = className[matchIndex].upper()
                    #print(name)
                    y1,x2,y2,x1 = faceLoc
                    y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                    cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
                    cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
                    cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
                    
                else: 
                    name = 'Unknown'
                    #print(name)
                    y1,x2,y2,x1 = faceLoc
                    y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
                    cv2.rectangle(img,(x1,y1),(x2,y2),(0,0,255),2)
                    cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,0,255),cv2.FILLED)
                    cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,255),2)
            
            out.write(img)
            cv2.imshow('Webcam',img)
            key = cv2.waitKey(1) & 0xFF
            if key ==ord('q'):
                client_socket.close()
            cv2.waitKey(1)
