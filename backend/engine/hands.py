from collections import Counter

# To add a new hand rank:
# 1. Create a class that extends HandRank
# 2. Set a unique name and priority
# 3. Implement check() — that's it, auto-registered

# Full poker hand rankings (priority):
# 1  - High Card        (implemented)
# 2  - One Pair         (implemented)
# 3  - Two Pair         (implemented)
# 4  - Three of a Kind  (implemented)
# 5  - Straight
# 6  - Flush            (implemented)
# 7  - Full House
# 8  - Four of a Kind
# 9  - Straight Flush
# 10 - Royal Flush

class HandRank:
    """
        Base class for all poker hand ranks.
        Subclasses register themselves automatically via __init_subclass__.
    """
    name = ""
    priority = 0
    registry = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if cls.name:
            HandRank.registry.append(cls)

    def check(self, cards):
        raise NotImplementedError

class HighCard(HandRank):
    """Fallback — always matches when nothing else does."""
    name = "High Card"
    priority = 1

    def check(self, cards):
        return True

class OnePair(HandRank):
    name = "One Pair"
    priority = 2

    def check(self, cards):
        counts = Counter(card.rank for card in cards)
        pairs = [count for count in counts.values() if count == 2]
        return len(pairs) == 1

class TwoPair(HandRank):
    name = "Two Pair"
    priority = 3

    def check(self, cards):
        counts = Counter(card.rank for card in cards)
        pairs = [count for count in counts.values() if count == 2]
        return len(pairs) == 2

class ThreeOfAKind(HandRank):
    name = "Three of a Kind"
    priority = 4

    def check(self, cards):
        counts = Counter(card.rank for card in cards)
        return 3 in counts.values()

class Flush(HandRank):
    """All five cards share the same suit."""
    name = "Flush"
    priority = 6

    def check(self, cards):
        return len(set(card.suit for card in cards)) == 1
