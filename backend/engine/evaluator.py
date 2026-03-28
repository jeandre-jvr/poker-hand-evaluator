from engine.hands import HandRank

class HandEvaluator:
    """
        Checks hands from highest rank to lowest and returns the first match.

        We check best-first because hands overlap — for example a Full House
        contains both a pair and three of a kind. Checking lowest-first would
        incorrectly return "One Pair" for a Full House.
    """
    def __init__(self):
        self.hand_ranks = [cls() for cls in HandRank.registry]
        self.hand_ranks.sort(key=lambda h: h.priority, reverse=True)

    def evaluate(self, cards):
        for hand_rank in self.hand_ranks:
            if hand_rank.check(cards):
                return hand_rank.name
