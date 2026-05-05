import { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Vibration, Keyboard } from 'react-native';
import AddFood from './components/AddFood';
import FoodOption from './components/FoodOption';


export default function App() {
  // STATE for food options and new food input
  const [foods, setFoods] = useState([
    { id: '1', text: 'Ramen 🍜' },
    { id: '2', text: "McDonald's 🍟" },
    { id: '3', text: 'Salad 🥗' },
  ]);
  const [newFood, setNewFood] = useState('');

  // Animation and result states
  const [isSpinning, setIsSpinning] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const [winnerId, setWinnerId] = useState(null);

  // LOGIC for adding, removing, and picking food options
  // 1. Add new food option
  const addFood = () => {
    if (newFood.trim() === '') return;
    if (foods.length >= 8) {
      alert('You can only add up to 8 options!');
      return;
    }

    setFoods((prev) => [...prev, { id: Date.now().toString(), text: newFood }]); // use timestamp as a simple unique ID
    setNewFood('');
    Keyboard.dismiss(); // auto keyboard dismiss after adding
    setWinnerId(null);  // reset winner state when adding new food
  };

  // 2. Delete a food option
  const removeFood = (id) => {
    if (isSpinning) return;
    setFoods((prev) => prev.filter((food) => food.id !== id));
    setWinnerId(null);
  };

  // 3. Pick a random food with animation
  const pickRandomFood = () => {
    if (foods.length === 0) return;

    setIsSpinning(true);
    setWinnerId(null);
    let count = 0;
    const maxSpins = 20; // total number of highlights during spinning

    // Create a spinning effect by randomly highlighting options at intervals
    const interval = setInterval(() => {
      // randomly pick an index to highlight
      const randomIndex = Math.floor(Math.random() * foods.length);
      setHighlightedId(foods[randomIndex].id);

      // 10ms vibrate on each highlight for tactile feedback with Vibration API
      Vibration.vibrate(10);
      count++;
      if (count >= maxSpins) {
        clearInterval(interval);
        // After spinning, set the final winner
        const finalWinner = foods[randomIndex].id;
        setHighlightedId(null);
        setWinnerId(finalWinner);
        setIsSpinning(false);
        Vibration.vibrate(500); // After picking a winner, vibrate for a longer time to indicate the result
      }
    }, 100); // highlight every 100ms for a smooth animation
  };

  // UI
  return (
    // styles.safeArea: for <SafeAreaView>, ensures content is not covered by notches/status bar.
    // styles.container: for <View>, main content area inside safeArea.
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>What to eat today? 🤔</Text>
        <Text style={styles.subHeader}>
          Options: {foods.length}/8
        </Text>

        {/* Add Food Input */}
        <AddFood
          value={newFood}
          onChange={setNewFood}
          onAdd={addFood} 
          disabled={foods.length >= 8 || isSpinning}
        />

        {/* Food Options List */}
        // FlatList is an efficient way to render lists, especially for larger datasets, as it only renders what's on screen. (FlatList ≈ map)
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodOption
              item={item}
              onRemove={removeFood} // // onRemove is equivalent of onClick for delete button in web
              isHighlighted={item.id === highlightedId}
              isWinner={item.id === winnerId}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No options yet. Add one!</Text>} // Show this text when the list is empty (FlatList's built-in attribute)
        />

        {/* Random Roll Button */}
        <TouchableOpacity
          style={[styles.drawButton, (foods.length === 0 || isSpinning) && styles.drawButtonDisabled]}
          onPress={pickRandomFood} // onPress is equivalent of onClick in web
          disabled={foods.length === 0 || isSpinning}
        >
          <Text style={styles.drawButtonText}>
            {isSpinning ? 'Rolling...' : 'Start Random! 🎲'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// React Native's StyleSheet for better performance and readability.
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  headerTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#212529', 
    textAlign: 'center', 
    marginBottom: 5 
  },
  subHeader: { 
    fontSize: 16, 
    color: '#6c757d', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#888' 
  },
  drawButton: {
    backgroundColor: '#ee5518',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    shadowColor: '#ee5518', 
    shadowOpacity: 0.4, 
    shadowRadius: 10,
  },
  drawButtonDisabled: { 
    backgroundColor: '#ccc', 
    shadowOpacity: 0 
  },
  drawButtonText: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
});