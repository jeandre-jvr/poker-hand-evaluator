from engine.deck import Deck

class TestDeck:
    def test_deck_has_52_cards(self):
        deck = Deck()
        assert len(deck.cards) == 52
    
    def test_deck_no_duplicates(self):
        deck = Deck()
        assert len(set(deck.cards)) == 52
    
    def test_deal_returns_correct_count(self):
        deck = Deck()
        hand = deck.deal(5)
        assert len(hand) == 5
