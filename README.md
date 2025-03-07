# SmartScroll
SmartScroll is an AI-Driven Interactive Learning Platform is designed to provide personalized
learning experiences for students by automatically generating quizzes,
flashcards, and summaries from user-uploaded study materials.

![SmartScroll Prototype](SmartScroll_git_prototype_2.0.gif)

**React Native Installation**

Clone the repository -> Navigate to react-native-app folder:

```bash
cd react-native-app
```

Install the project dependencies using npm:

```bash
npm install
```

**Running the React Native Project - Simulator (XCode)**

```bash
npm start
```
Note: you would need to install Expo, have a XCode Simulator on your macOS or have an Expo App installed on your iPhone.

**Running the Server Side - Simulator (XCode)** 

Note: you must be connected to Goethe Uni VPN to run the App server! (on all target devices, also available for iOS, macOS) 
VPN instructions: https://www.rz.uni-frankfurt.de/45200557/Kurzanleitung, https://www.rz.uni-frankfurt.de/45186991/Verbinden_via_AnyConnect.

```bash
cd Backend/app
```

Install the project dependencies using pip (or pip3):

```bash
pip install -r requirements.txt

```

Then, run inside the /Backend/app folder:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**OpenAI API key**

In addition, you will need to enter the OpenAI API key in config.py to upload the PDFs and communicate with the ChatBot. 
As it is not safe to enter this key here, please contact our team privately to request the key.

**ALternative Approach - Real Device** 

To make the server reachable from any device in your local network (both computer and smartphone):

On macOS & Linux, copy Computer’s Local Network IP after running:
```bash
ipconfig getifaddr en0
```

Then, run inside the /Backend/app folder:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Finally, correct the IP address inside each **fetch()** in /react-native-app/app:
```bash
const response = await fetch('http://127.0.0.1:8000/quizzes');
```
(replace 127.0.0.1 with your Computer’s Local Network IP)
*Hint*: currently only home.jsx, create.jsx and chatbot.jsx contain API requests.

Further instructions can be found on https://docs.expo.dev/.