# 🍕 RandomFoodPicker (React Native App)
> Building on my MERN stack experience, React Native allowed me to extend familiar React concepts into mobile app development. This project demonstrates how web development skills can transition into building cross-platform, native-like applications, with a focus on interactive user experience, state management, and native device integration. 

Tired of deciding what to eat? This mobile-native application built with React Native allows us to input our food options and uses a highlighting animation combining with native hardware vibration to pick a random winner!

## ⚙️ Prerequisites
1. Install Node.js
	- If you are unsure whether Node.js is installed, open your terminal and run: `node -v`
2. Install [**Expo Go**](https://expo.dev/go) on your mobile device from the App Store (iOS) or Google Play (Android)

## 📦 Installation & Running
1.  **Create a new project:** `npx create-expo-app RandomFoodPicker-app --template blank`

    ***Note:** This demo does not use the latest Expo Router structure, as it is a single-page prototype focused on core React Native components. The `template blank` keeps the project lightweight since no navigation is required.*

2. **Install dependencies:** `npm install`
3. **Start the project:**
   - Navigate to your project folder: `cd RandomFoodPicker-app`
   - Run: `npm start` (Do not use `npm run android`, `npm run ios`, or `npm run web`)

   *Note: About other commands:*
   - `npm run web`: Opens the app in your web browser (e.g., Chrome). Good for quick testing, but lacks the full mobile app experience.
   - `npm run ios`: Runs the app in an iOS simulator. Only works on Mac with Xcode installed.
   - `npm run android`: Runs the app in an Android emulator. Requires Android Studio and a configured virtual device.

4. **Run the app:**  
    - On iPhone, simply use the Camera app to scan the QR code. 
    - On Android, use the "Scan QR Code" feature inside Expo Go. The app will open automatically on your device.


## 🧱 App Architecture

### 1. State Management

Use `useState` to manage the app's core data and UI changes just like React:

- **Food List:** Stores all current food options (`const [foods, setFoods] = useState([...])`).
- **Animation State:** Tracks whether the app is currently spinning to disable buttons (`const [isSpinning, setIsSpinning] = useState(false)`).
- **Effect Tracking:** Tracks the currently highlighted option ID and the final winner's option ID with (`const [highlightedId, setHighlightedId] = useState(null)`, `const [winnerId, setWinnerId] = useState(null)`).

### 2. Logic

- **Add Food (`addFood()`)**: Check if the list exceeds 8 items, add a new option, and call `Keyboard.dismiss()` to close the keyboard.
- **Remove Food (`removeFood()`)**: Remove a specific option from the array (disabled during spinning).
- **Pick Random Food (`pickRandomFood()`)**: Use `setInterval` and `Math.random()` to randomly highlight an option every 0.1 seconds, with short `Vibration.vibrate()` feedback. After the loop, selects a winner and triggers a long vibration.


### 3. UI Rendering

State is rendered into a mobile UI using these React Native core components:

- **`<View>`**: Main layout container.
- **`<Text>`**: For displaying text.
- **`<TextInput>`**: For input, supporting mobile keyboard behaviors.
- **`<TouchableOpacity>`**: For buttons with native touch feedback .
- **`<FlatList>`**: For rendering lists, optimized for mobile performance.


## 🌟 App Features 
- Users can tap a button to trigger a random selection.
- Users can dynamically add or remove food options (up to 8 items).
- The soft keyboard dismisses automatically for a better mobile experience.
- The app uses a fast-paced highlighting effect to build suspense.
- Use native device hardware (Vibration API) to enhance UX.
<br>
<div align="center">
   <img src="RandomFoodPicker-app/image/Demo.gif" alt="Demo Preview" width="200"/>
</div>

## 🆚 React vs React Native

| Feature / Concept| React (Web) Example| React Native Example|
|------------------|--------------------|---------------------|
| UI Element|`<div>`, `<span>`, `<button>`|`<View>`, `<Text>`, `<TouchableOpacity>`|
| List Rendering|`{array.map(item => <Comp />)}`|`<FlatList data={...} renderItem={...} />`|
| Styling|`className="card"`, CSS/SCSS|`style={styles.card}`, StyleSheet|
| Event Handling|`onClick`, `onChange`|`onPress`, `onChangeText`|
| Safe Area| (N/A, use CSS)|`<SafeAreaView>`|
| Image Display|`<img src="..." />`|`<Image source={{uri: '...'}} />`|


