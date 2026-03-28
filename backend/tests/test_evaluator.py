from engine.card import Card
from engine.constants import Rank, Suit
from engine.evaluator import HandEvaluator

class TestEvaluator:
    def setup_method(self):
        self.evaluator = HandEvaluator()
    
    def test_high_card(self):
        hand = [
            Card(Rank.TWO, Suit.HEARTS),
            Card(Rank.FIVE, Suit.SPADES),
            Card(Rank.EIGHT, Suit.DIAMONDS),
            Card(Rank.JACK, Suit.CLUBS),
            Card(Rank.ACE, Suit.SPADES),
        ]
        assert self.evaluator.evaluate(hand) == "High Card"
    
    def test_one_pair(self):
        hand = [
            Card(Rank.ACE, Suit.SPADES),
            Card(Rank.ACE, Suit.HEARTS),
            Card(Rank.THREE, Suit.CLUBS),
            Card(Rank.SEVEN, Suit.DIAMONDS),
            Card(Rank.NINE, Suit.SPADES),
        ]
        assert self.evaluator.evaluate(hand) == "One Pair"
    
    def test_two_pair(self):
        hand = [
            Card(Rank.TEN, Suit.SPADES),
            Card(Rank.TEN, Suit.CLUBS),
            Card(Rank.THREE, Suit.DIAMONDS),
            Card(Rank.THREE, Suit.SPADES),
            Card(Rank.ACE, Suit.SPADES),
        ]
        assert self.evaluator.evaluate(hand) == "Two Pair"
    
    def test_three_of_a_kind(self):
        hand = [
            Card(Rank.SEVEN, Suit.SPADES),
            Card(Rank.SEVEN, Suit.HEARTS),
            Card(Rank.SEVEN, Suit.CLUBS),
            Card(Rank.THREE, Suit.DIAMONDS),
            Card(Rank.ACE, Suit.SPADES),
        ]
        assert self.evaluator.evaluate(hand) == "Three of a Kind"
    
    def test_flush(self):
        hand = [
            Card(Rank.TWO, Suit.HEARTS),
            Card(Rank.FIVE, Suit.HEARTS),
            Card(Rank.EIGHT, Suit.HEARTS),
            Card(Rank.JACK, Suit.HEARTS),
            Card(Rank.ACE, Suit.HEARTS),
        ]
        assert self.evaluator.evaluate(hand) == "Flush"
    
    def test_flush_beats_pair(self):
        hand = [
            Card(Rank.TWO, Suit.HEARTS),
            Card(Rank.TWO, Suit.HEARTS),
            Card(Rank.EIGHT, Suit.HEARTS),
            Card(Rank.JACK, Suit.HEARTS),
            Card(Rank.ACE, Suit.HEARTS),
        ]
        assert self.evaluator.evaluate(hand) == "Flush"
