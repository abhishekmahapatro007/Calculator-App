# Installation: Building APK from AAB using Expo, EAS, and BundleTool

This guide provides a detailed walkthrough on how to build an APK file from an Android App Bundle (AAB) file generated using **Expo** and **EAS Build**. Additionally, we will cover how to use **bundletool** to convert the AAB to APK and install it on your Android device.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Set up Expo and EAS CLI](#step-1-set-up-expo-and-eas-cli)
3. [Step 2: Build APK Using EAS Build](#step-2-build-apk-using-eas-build)
4. [Step 3: Download AAB from EAS](#step-3-download-aab-from-eas)
5. [Step 4: Convert AAB to APK Using BundleTool](#step-4-convert-aab-to-apk-using-bundletool)
6. [Step 5: Install APK on Android Device](#step-5-install-apk-on-android-device)
7. [Commands Reference](#commands-reference)

---

## Prerequisites

Before starting, ensure the following tools are installed:

- **Node.js** (recommended version: v14 or v16)
- **Expo CLI**: To manage Expo projects (legacy command-line interface).
- **EAS CLI**: To manage builds and deployments with Expo Application Services.
- **Java JDK** (JDK 8 or newer) for bundletool and Android-related tasks.
- **bundletool**: The official tool to convert AAB files into APKs.

You will also need:
- **An Expo account** (for uploading and managing your app).
- **A Keystore** (for signing your APK during the build process).

---

## Step 1: Set up Expo and EAS CLI

First, make sure you have **Expo CLI** and **EAS CLI** installed.

1. **Install Expo CLI (legacy)**:

    ```bash
    npm install -g expo-cli
    ```

    Or use the new **local Expo CLI** (from SDK 46 onward):

    ```bash
    npm install expo
    ```

2. **Install EAS CLI** (to replace the old `expo build` command):

    ```bash
    npm install -g eas-cli
    ```

3. Log in to your Expo account using:

    ```bash
    expo login
    ```

    or if using the new local CLI:

    ```bash
    npx expo login
    ```

---

## Step 2: Build APK Using EAS Build

Now, create and configure your Expo project to use EAS Build.

1. Initialize EAS Build:

    ```bash
    eas build:configure
    ```

    Follow the prompts to set up your project for EAS Build.

2. Configure the Android build:

    Set the **Android Application ID** (package name) and ensure the versioning is correct. EAS will also automatically set up a Keystore for signing your APK.

    Example:

    ```bash
    eas build -p android
    ```

3. Once configured, trigger the build:

    ```bash
    eas build -p android
    ```

    This command will upload your app to **EAS Build** and create an AAB file for your app.

    **Note**: This process might take a few minutes. Once completed, you will get a build URL to download the `.aab` file.

---

## Step 3: Download AAB from EAS

After the build completes, you will receive a URL to download your **Android App Bundle (AAB)**.

Example build URL:

```plaintext
https://expo.dev/accounts/<Your Expo Account>/projects/<Your Project>/builds/<build-id>
```
## Step 4: Convert AAB to APK Using BundleTool

Once you have the AAB file, you can convert it to an APK file using `bundletool`. Here’s how:

### 1. Download BundleTool
Download BundleTool from the GitHub releases page:  
[https://github.com/google/bundletool/releases](https://github.com/google/bundletool/releases)

### 2. Run BundleTool

To convert an `.aab` to APKs, you need to use the `build-apks` command. First, download the bundletool JAR file (`bundletool-all-<version>.jar`).

#### Command:
```bash
java -jar bundletool-all-<version>.jar build-apks \
  --bundle=/path/to/your-app.aab \
  --output=/path/to/output.apks \
  --ks=/path/to/your/keystore \
  --ks-key-alias=your-key-alias \
  --ks-pass=pass:your-keystore-password \
  --key-pass=pass:your-key-password
```
## Step 5: Install APK on Android Device
Install the apk on your Android phone.

# Commands Reference

## Expo CLI Commands

- **Login:**
    ```bash
    expo login
    ```

- **Initialize EAS Build:**
    ```bash
    eas build:configure
    ```

- **Build for Android:**
    ```bash
    eas build -p android
    ```

- **Monitor Build Process:**
    After triggering the build, you can view build details using the provided URL.

---

## BundleTool Commands

- **Build APK Set from AAB:**
    ```bash
    java -jar bundletool-all-<version>.jar build-apks \
      --bundle=/path/to/your-app.aab \
      --output=/path/to/output.apks \
      --ks=/path/to/your/keystore \
      --ks-key-alias=your-key-alias \
      --ks-pass=pass:your-keystore-password \
      --key-pass=pass:your-key-password
    ```

- **Extract APK from APK Set:**
    ```bash
    java -jar bundletool-all-<version>.jar extract-apks \
      --apks=/path/to/output.apks \
      --output-dir=/path/to/output-apks
    ```

- **Install APK on Android Device:**
    ```bash
    adb install /path/to/your.apk
    ```

---

## Conclusion

You now have a complete workflow to convert an Android App Bundle (AAB) to APK and install it on your Android device, using Expo, EAS Build, and bundletool.

---

# How To Setup Your Project
Creating a simple working calculator app using React Native that can work on the web (via React Native Web) is absolutely possible! Let me walk you through it step-by-step. We’ll build a basic calculator with the core functionality of addition, subtraction, multiplication, and division.

Here’s how to do it:
---
## Step 1: Set Up the React Native Environment
First, ensure that you have the necessary tools installed:

Node.js - Download and install Node.js
Expo CLI - Install Expo CLI globally via npm (this allows you to run React Native apps both on mobile and in the web):
```bash
npm install -g expo-cli
```
---
## Step 2: Create a New Expo Project
Create a new Expo project with a web support template:

```bash
expo init CalculatorApp
cd CalculatorApp
```
Choose the "blank" template when prompted.
---
## Step 3: Install React Native Web
Expo comes with React Native Web by default, but just in case, you can ensure it's set up properly by running:

```bash
expo install react-native-web react-dom
```
---
## Step 4: Create the Calculator App
-
Now, let’s build the actual calculator UI and functionality. Open the App.js file and replace its content with the calculator code.
---
## Step 5: Run the App on Web
To test your app on the web, run the following command:

```bash
expo start --web
```
This will start your app and open it in the web browser. You should see a basic calculator with buttons for digits and basic operations.
## Or ##
```bash
npm run start
```
and press w to run on web or scan QR Code in your Expo Go App installed in your phone to directly run on phone.(later is recommended)

Explanation of Code:
```plaintext
State Management:

input holds the string of the current expression.
output holds the result of the calculation.
Button Handlers:

handlePress: Adds a number or operator to the input string.
handleClear: Clears both the input and output.
handleEvaluate: Uses eval() to compute the result of the input expression. If an error occurs (e.g., invalid expression), it displays "Error."
```
### Layout:

The buttons are laid out in rows of four.
The input field shows the current expression, and the result field shows the calculated result.
---
## Step 6: Improve or Customize (Optional)
Styling: Adjust the styles to make the app look more polished.
Error Handling: The use of eval() can be risky. Consider using a library like math.js for a more secure evaluation of mathematical expressions.
Mobile Support: Since we’re using Expo, the app works both on mobile and web.
### Final Thoughts:
This is a very simple React Native app that works on both mobile and web, leveraging Expo and React Native Web. React Native Web is powerful because it allows you to write code that works across platforms seamlessly, which is perfect for simple applications like this calculator!



#### By following the steps above, you can:

- Build your app using EAS Build and create an AAB.
- Convert the AAB to APK using bundletool.
- Install the APK on your Android device without requiring the Google Play Store.

