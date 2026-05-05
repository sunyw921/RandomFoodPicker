import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FoodOption({ item, onRemove, isHighlighted, isWinner }) {
    return (
        // View ≈ div, Text ≈ span/p 
        // TouchableOpacity (≈ button) is React Native's way of making a View clickable, providing a dimming effect when pressed. 
        <View style={[
            styles.card,
            isHighlighted && styles.highlightedCard, // highlight when spinning
            isWinner && styles.winnerCard            // special styling for the winner
        ]}>
            <Text style={[
                styles.optionText,
                isWinner && styles.winnerText
            ]}>
                {item.text}
            </Text>

            {/* If not the winner, show the delete buttons */}
            {!isWinner && (
                <TouchableOpacity onPress={() => onRemove(item.id)}>
                    <Text style={styles.deleteText}>❌</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// React Native's StyleSheet for better performance and readability.
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    highlightedCard: {
        backgroundColor: '#ffeaa7',
        transform: [{ scale: 1.02 }],
    },
    winnerCard: {
        backgroundColor: '#f1483b',
        paddingLeft: 20,
        borderRadius: 10,
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2f3542'
    },
    winnerText: {
        color: '#faf7f7',
        fontSize: 22,
        fontWeight: 'bold'
    },
    deleteText: {
        fontSize: 16
    },
});