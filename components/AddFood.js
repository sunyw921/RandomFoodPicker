import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddFood({ value, onChange, onAdd, disabled }) {
    return (
        // View ≈ div, TextInput ≈ input
        // TouchableOpacity (≈ button) is React Native's way of making a View clickable, providing a dimming effect when pressed. 
        <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="e.g. Sushi 🍣"
                value={value}
                onChangeText={onChange} // onChangeText is equivalent of onChange in web
                maxLength={15}
            />
            <TouchableOpacity
                style={[styles.addButton, disabled && styles.disabledButton]}
                onPress={onAdd} 
                disabled={disabled}
            >
                <Text style={styles.addButtonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}

// React Native's StyleSheet for better performance and readability. 
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#19aa55',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        marginLeft: 10,
    },
    disabledButton: {
        backgroundColor: '#ccc'
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
});