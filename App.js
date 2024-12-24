import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { evaluate } from 'mathjs';  // Using 'mathjs' for evaluating expressions safely
import Icon from 'react-native-vector-icons/Ionicons'; 

// Calculator App component
export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Factorial function
  const calculateFactorial = (n) => {
    if (n < 0) return 'Error';
    return n === 0 || n === 1 ? 1 : n * calculateFactorial(n - 1);
  };

  // Handle button press for digits and operators
  const handlePress = (value) => {
    if (value === 'x!') {
      // Extract the number before the factorial operator
      const number = parseFloat(input);
      const result = calculateFactorial(number);
      setOutput(result.toString());
      setInput(result.toString());
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  // Handle "back" button press to delete the last character
  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  // Handle "AC" button press to clear input and output
  const handleClearAll = () => {
    setInput('');
    setOutput('');
  };

  // Handle the reciprocal calculation (1/x)
  const handleReciprocal = () => {
    try {
      const result = 1 / parseFloat(input);
      setOutput(result.toString());
    } catch (error) {
      setOutput('Error');
    }
  };

  // Handle the evaluation of the expression
  const handleEvaluate = () => {
    console.log('Input:', input);  // Debugging: Check the input before evaluation
    if (input.split('(').length !== input.split(')').length) {
      setOutput('Error: Unmatched parentheses');
      return;
    }
  
    try {
      const result = evaluate(input);
      setOutput(result.toString());
    } catch (error) {
      console.error('Error:', error);  // Log the actual error for debugging
      setOutput('Error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.display}
        value={input}
        editable={false}
        placeholder="0"
      />
      <Text style={styles.result}>{output}</Text>

      <ScrollView
        style={styles.buttonContainer}
        contentContainerStyle={styles.buttonGrid}
        keyboardShouldPersistTaps="handled"
      >
        {/* First Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('sin(')}>
            <Text style={[styles.buttonText, styles.orangeText]}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('cos(')}>
            <Text style={[styles.buttonText, styles.orangeText]}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('tan(')}>
            <Text style={[styles.buttonText, styles.orangeText]}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('^')}>
            <Text style={[styles.buttonText, styles.orangeText]}>x^y</Text>
          </TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('(')}>
            <Text style={[styles.buttonText, styles.orangeText]}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}>
            <Text style={[styles.buttonText, styles.orangeText]}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClearAll}>
            <Text style={[styles.buttonText, styles.orangeText]}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleBackspace}>
            <Icon name="backspace" size={30} color="orange" />
          </TouchableOpacity>
        </View>

        {/* Third Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('sqrt(')}>
            <Text style={[styles.buttonText, styles.orangeText]}>√x</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReciprocal}>
            <Text style={[styles.buttonText, styles.orangeText]}>1/x</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('%')}>
            <Text style={[styles.buttonText, styles.orangeText]}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
            <Text style={[styles.buttonText, styles.orangeText]}>/</Text>
          </TouchableOpacity>
        </View>

        {/* Fourth Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
            <Text style={[styles.buttonText, styles.orangeText]}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
            <Text style={[styles.buttonText, styles.orangeText]}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
            <Text style={[styles.buttonText, styles.orangeText]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('=')}>
            <Text style={[styles.buttonText, styles.orangeText]}>=</Text>
          </TouchableOpacity>
        </View>

        {/* Fifth Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('x!')}>
            <Text style={[styles.buttonText, styles.orangeText]}>x!</Text>
          </TouchableOpacity>
        </View>

        {/* Sixth Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('pi')}>
            <Text style={[styles.buttonText, styles.orangeText]}>π</Text>
          </TouchableOpacity>
        </View>

        {/* Seventh Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
        </View>

        {/* Eighth Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('e')}>
            <Text style={[styles.buttonText, styles.orangeText]}>e</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.equalButton} onPress={handleEvaluate}>
            <Text style={styles.equalButtonText}>=</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer with Copyright */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© Developed and Published by Abhishek Mahapatro</Text>
      </View>
    </View>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
      },
      header: {
        fontSize: 32,
        marginBottom: 20,
        color: 'white',
      },
      display: {
        fontSize: 40,
        marginBottom: 10,
        width: '100%',
        textAlign: 'right',
        padding: 10,
        color: 'white',
        paddingTop: 100,
      },
      result: {
        fontSize: 30,
        color: 'orange',
        marginBottom: 20,
      },
      buttonContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 120,  // This ensures there's space for the footer
      },
      buttonGrid: {
        flexGrow: 1,
        justifyContent: 'flex-start',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      button: {
        flex: 1,
        height: 80,
        width:80,
        margin: 2,
        backgroundColor: '#2c2c2c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
      },
      buttonText: {
        fontSize: 30,
        color: 'white',
      },
      sup: {
        fontSize: 16, // smaller size for the superscript
        position: 'relative',
        top: -5, // raises the text above the baseline
      },
      orangeText: {
        color: 'orange',
      },
      equalButton: {
        backgroundColor: 'orange',
        borderRadius: 15,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        margin: 5,
      },
      equalButtonText: {
        fontSize: 30,
        color: 'white',
      },
      footer: {
        padding: 10,
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 25,
        left: 0,
      },
      footerText: {
        color: 'white',
        fontSize: 14,
      },
});


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
// import { evaluate } from 'mathjs';  // Using 'mathjs' for evaluating expressions safely

// // Calculator App component
// export default function App() {
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');

//   // Factorial function
//   const calculateFactorial = (n) => {
//     if (n < 0) return 'Error';
//     return n === 0 || n === 1 ? 1 : n * calculateFactorial(n - 1);
//   };

//   // Handle button press for digits and operators
//   const handlePress = (value) => {
//     if (value === 'x!') {
//       // Extract the number before the factorial operator
//       const number = parseFloat(input);
//       const result = calculateFactorial(number);
//       setOutput(result.toString());
//       setInput(result.toString());
//     } else {
//       setInput((prevInput) => prevInput + value);
//     }
//   };

//   // Handle "back" button press to delete the last character
//   const handleBackspace = () => {
//     setInput((prevInput) => prevInput.slice(0, -1));
//   };

//   // Handle "AC" button press to clear input and output
//   const handleClearAll = () => {
//     setInput('');
//     setOutput('');
//   };

//   // Handle the reciprocal calculation (1/x)
//   const handleReciprocal = () => {
//     try {
//       const result = 1 / parseFloat(input);
//       setOutput(result.toString());
//     } catch (error) {
//       setOutput('Error');
//     }
//   };

//   // Handle the evaluation of the expression
//   const handleEvaluate = () => {
//     console.log('Input:', input);  // Debugging: Check the input before evaluation
//     if (input.split('(').length !== input.split(')').length) {
//       setOutput('Error: Unmatched parentheses');
//       return;
//     }
  
//     // Optional: Fix ln function
//     let fixedInput = input.replace(/ln\(/g, 'log(e,');
  
//     try {
//       const result = evaluate(fixedInput);
//       setOutput(result.toString());
//     } catch (error) {
//       console.error('Error:', error);  // Log the actual error for debugging
//       setOutput('Error');
//     }
//   };
//   // const handleEvaluate = () => {
//   //   try {
//   //     const result = evaluate(input);
//   //     setOutput(result.toString());
//   //   } catch (error) {
//   //     setOutput('Error');
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.display}
//         value={input}
//         editable={false}
//         placeholder="0"
//       />
//       <Text style={styles.result}>{output}</Text>

//       <ScrollView
//         style={styles.buttonContainer}
//         contentContainerStyle={styles.buttonGrid}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* First Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('sin(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>sin</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('cos(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>cos</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('tan(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>tan</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('^')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>x^y</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Second Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('log(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>log</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('ln(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>ln</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>(</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>)</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Third Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('sqrt(')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>√x</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleClearAll}>
//             <Text style={[styles.buttonText, styles.orangeText]}>AC</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleBackspace}>
//             <Text style={[styles.buttonText, styles.orangeText]}> &lt;= </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('%')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>%</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Fourth Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>/</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>*</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>-</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>+</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Fifth Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('x!')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>x!</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
//             <Text style={styles.buttonText}>7</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
//             <Text style={styles.buttonText}>8</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
//             <Text style={styles.buttonText}>9</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Sixth Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={handleReciprocal}>
//             <Text style={[styles.buttonText, styles.orangeText]}>1/x</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
//             <Text style={styles.buttonText}>4</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
//             <Text style={styles.buttonText}>5</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
//             <Text style={styles.buttonText}>6</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Seventh Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('pi')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>π</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
//             <Text style={styles.buttonText}>1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
//             <Text style={styles.buttonText}>2</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
//             <Text style={styles.buttonText}>3</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Eighth Row */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('e')}>
//             <Text style={[styles.buttonText, styles.orangeText]}>e</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
//             <Text style={styles.buttonText}>0</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
//             <Text style={styles.buttonText}>.</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.equalButton} onPress={handleEvaluate}>
//             <Text style={styles.equalButtonText}>=</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Footer with Copyright */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>© Developed and Published by Abhishek Mahapatro</Text>
//       </View>
//     </View>
//   );
// }

// // Styles for the app
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   header: {
//     fontSize: 32,
//     marginBottom: 20,
//     color: 'white',
//   },
//   display: {
//     fontSize: 40,
//     marginBottom: 10,
//     width: '100%',
//     textAlign: 'right',
//     padding: 10,
//     color: 'white',
//     paddingTop: 100,
//   },
//   result: {
//     fontSize: 30,
//     color: 'orange',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flex: 1,
//     width: '100%',
//     paddingBottom: 120,  // This ensures there's space for the footer
//   },
//   buttonGrid: {
//     flexGrow: 1,
//     justifyContent: 'flex-start',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   button: {
//     flex: 1,
//     height: 70,
//     margin: 2,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 30,
//     color: 'white',
//   },
//   sup: {
//     fontSize: 16, // smaller size for the superscript
//     position: 'relative',
//     top: -5, // raises the text above the baseline
//   },
//   orangeText: {
//     color: 'orange',
//   },
//   equalButton: {
//     backgroundColor: 'orange',
//     borderRadius: 50,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 70,
//     height: 70,
//     margin: 5,
//   },
//   equalButtonText: {
//     fontSize: 30,
//     color: 'white',
//   },
//   footer: {
//     padding: 10,
//     backgroundColor: 'black',
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 25,
//     left: 0,
//   },
//   footerText: {
//     color: 'white',
//     fontSize: 14,
//   },
// });
