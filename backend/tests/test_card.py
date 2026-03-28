import pytest
from engine.card import Card
from engine.constants import Rank, Suit, RANK_DISPLAY, DISPLAY_TO_RANK

class TestCard:
    def test_card_str(self):
        card = Card(Rank.ACE, Suit.SPADES)
        assert str(card) == "A of Spades"

    def test_card_equality(self):
        card1 = Card(Rank.ACE, Suit.SPADES)
        card2 = Card(Rank.ACE, Suit.SPADES)
        assert card1 == card2

    def test_card_frozen(self):
        card = Card(Rank.ACE, Suit.SPADES)
        with pytest.raises(AttributeError):
            card.rank = Rank.TWO

class TestConstants:
    def test_all_ranks_have_display(self):
        for rank in Rank:
            assert rank in RANK_DISPLAY
    
    def test_display_to_rank_reverse(self):
        for display, rank in DISPLAY_TO_RANK.items():
            assert RANK_DISPLAY[rank] == display
