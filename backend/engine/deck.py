import random
from engine.card import Card
from engine.constants import Rank, Suit

class Deck:
    def __init__(self):
        self.cards = [Card(rank, suit) for suit in Suit for rank in Rank]

    def deal(self, count=5):
        hand = random.sample(self.cards, count)
        return hand
