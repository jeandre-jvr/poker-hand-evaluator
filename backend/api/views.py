from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from engine.constants import RANK_DISPLAY, Suit, DISPLAY_TO_RANK
from engine.card import Card
from engine.deck import Deck
from engine.evaluator import HandEvaluator
from api.serializers import HandSerializer

class CardView(APIView):
    def get(self, request):
        return Response({
            "success": True,
            "data": {
                "ranks": list(RANK_DISPLAY.values()),
                "suits": [s.value for s in Suit],
            }
        })

class RandomHandView(APIView):
    def get(self, request):
        deck = Deck()
        hand = deck.deal(5)
        return Response({
            "success": True,
            "data": {
                "cards": [{"rank": RANK_DISPLAY[c.rank], "suit": c.suit.value} for c in hand]
            }
        })

class EvaluateView(APIView):
    def post(self, request):
        serializer = HandSerializer(data=request.data)
        if not serializer.is_valid():
            first_error = self.get_first_error(serializer.errors)
            return Response(
                {"success": False, "error": first_error},
                status=status.HTTP_400_BAD_REQUEST
            )

        cards = []
        for card_data in serializer.validated_data['cards']:
            rank = DISPLAY_TO_RANK[card_data['rank']]
            suit = Suit(card_data['suit'])
            cards.append(Card(rank, suit))

        evaluator = HandEvaluator()
        result = evaluator.evaluate(cards)

        return Response({
            "success": True,
            "data": {
                "result": result,
            }
        })

    def get_first_error(self, errors):
        for key, value in errors.items():
            if isinstance(value, list):
                return str(value[0])
            if isinstance(value, dict):
                return self.get_first_error(value)
            for item in value:
                if isinstance(item, dict):
                    return self.get_first_error(item)
                return str(item)
