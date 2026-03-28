from dataclasses import dataclass
from engine.constants import Rank, Suit, RANK_DISPLAY

@dataclass(frozen=True)
class Card:
    rank: Rank
    suit: Suit

    def __str__(self):
        return f"{RANK_DISPLAY[self.rank]} of {self.suit.value}"
