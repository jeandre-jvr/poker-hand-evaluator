from rest_framework import serializers
from engine.constants import RANK_DISPLAY, Suit

class CardSerializer(serializers.Serializer):
    rank = serializers.ChoiceField(choices=list(RANK_DISPLAY.values()))
    suit = serializers.ChoiceField(choices=[s.value for s in Suit])

class HandSerializer(serializers.Serializer):
    cards = CardSerializer(many=True)

    def validate_cards(self, value):
        if len(value) != 5:
            raise serializers.ValidationError("A poker hand must contain exactly 5 cards.")

        seen = set()
        for card in value:
            key = (card['rank'], card['suit'])
            if key in seen:
                raise serializers.ValidationError(
                    f"The {card['rank']} of {card['suit']} appears more than once."
                )
            seen.add(key)

        return value
