# SmartScroll
SmartScroll is an AI-Driven Interactive Learning Platform is designed to provide personalized
learning experiences for students by automatically generating quizzes,
flashcards, and summaries from user-uploaded study materials.

![SmartScroll Mock-Up](SmartScroll_gif_mockup_2.gif)

**React Native Installation**

Clone the repository -> Navigate to react-native-app folder:

```bash
cd react-native-app
```

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm start
```
Note: you would need to install Expo, have a XCode Simulator on your macOS or have an Expo App installed on your iPhone.

**Running the Server Side** 
Note: you must be connected to Goethe Uni VPN to run the App server! (on all target devices, also available for iOS) 

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