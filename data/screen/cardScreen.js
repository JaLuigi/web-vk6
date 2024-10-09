import { StyleSheet, View, Button, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import Card from '../components/card'

export default function cardScreen() {
    const [deckId, setDeckId] = useState(null); // Corrected setDeckId
    const [cards, setCards] = useState([]);
    const [remaining, setRemaining] = useState(52);

    const shuffleDeck = async () => {
        try {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
            setDeckId(response.data.deck_id);
            setRemaining(52);
            setCards([]);
        } catch (error) {
            console.error("Error shuffling the deck:", error);
        }
    };

    const drawCard = async () => {
        if (!deckId) {
            alert("Please shuffle the deck first!");
            return;
        }

        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            if (response.data.success) {
                setCards([...cards, ...response.data.cards]);  // Append new card to the existing cards
                setRemaining(response.data.remaining);
            } else {
                alert("No more cards in the deck!");
            }
        } catch (error) {
            console.error("Error drawing a card:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Shuffle Deck" onPress={shuffleDeck} />
            <Button title="Draw Card" onPress={drawCard} disabled={remaining === 0} />
            <Text style={styles.remainingText}>Remaining Cards: {remaining}</Text>

            <ScrollView horizontal style={styles.cardContainer}>
                {cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#f5f5f5',
    },
    remainingText: {
        fontSize: 18,
        marginVertical: 10,
    },
    cardContainer: {
        marginTop: 20,
        flexDirection: 'row',
    }
});
