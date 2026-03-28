from django.test import TestCase
from rest_framework.test import APIClient

class TestCardView(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_cards(self):
        response = self.client.get('/api/cards/')
        assert response.status_code == 200
        assert response.data['success'] is True
        assert '2' in response.data['data']['ranks']
        assert 'A' in response.data['data']['ranks']
        assert 'Hearts' in response.data['data']['suits']
        assert len(response.data['data']['ranks']) == 13
        assert len(response.data['data']['suits']) == 4

class TestRandomHandView(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_random_hand_returns_five_cards(self):
        response = self.client.get('/api/deal/')
        assert response.status_code == 200
        assert response.data['success'] is True
        assert len(response.data['data']['cards']) == 5

    def test_random_hand_has_valid_keys(self):
        response = self.client.get('/api/deal/')
        for card in response.data['data']['cards']:
            assert 'rank' in card
            assert 'suit' in card

class TestEvaluateView(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_one_pair(self):
        response = self.client.post('/api/evaluate/', {
            'cards': [
                {'rank': 'A', 'suit': 'Spades'},
                {'rank': 'A', 'suit': 'Hearts'},
                {'rank': '3', 'suit': 'Clubs'},
                {'rank': '7', 'suit': 'Diamonds'},
                {'rank': '9', 'suit': 'Spades'},
            ]
        }, format='json')
        assert response.status_code == 200
        assert response.data['success'] is True
        assert response.data['data']['result'] == 'One Pair'

    def test_flush(self):
        response = self.client.post('/api/evaluate/', {
            'cards': [
                {'rank': '2', 'suit': 'Hearts'},
                {'rank': '5', 'suit': 'Hearts'},
                {'rank': '8', 'suit': 'Hearts'},
                {'rank': 'J', 'suit': 'Hearts'},
                {'rank': 'A', 'suit': 'Hearts'},
            ]
        }, format='json')
        assert response.status_code == 200
        assert response.data['success'] is True
        assert response.data['data']['result'] == 'Flush'

    def test_too_few_cards(self):
        response = self.client.post('/api/evaluate/', {
            'cards': [
                {'rank': 'A', 'suit': 'Spades'},
            ]
        }, format='json')
        assert response.status_code == 400
        assert response.data['success'] is False

    def test_duplicate_cards(self):
        response = self.client.post('/api/evaluate/', {
            'cards': [
                {'rank': 'A', 'suit': 'Spades'},
                {'rank': 'A', 'suit': 'Spades'},
                {'rank': '3', 'suit': 'Clubs'},
                {'rank': '7', 'suit': 'Diamonds'},
                {'rank': '9', 'suit': 'Spades'},
            ]
        }, format='json')
        assert response.status_code == 400
        assert response.data['success'] is False

    def test_invalid_rank(self):
        response = self.client.post('/api/evaluate/', {
            'cards': [
                {'rank': 'X', 'suit': 'Spades'},
                {'rank': 'A', 'suit': 'Hearts'},
                {'rank': '3', 'suit': 'Clubs'},
                {'rank': '7', 'suit': 'Diamonds'},
                {'rank': '9', 'suit': 'Spades'},
            ]
        }, format='json')
        assert response.status_code == 400
        assert response.data['success'] is False
