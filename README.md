# Poker Hand Evaluator

A browser-based tool that evaluates a 5-card poker hand and returns the highest ranking hand. Built with Django REST Framework and Angular.

## Tech Stack

- **Backend:** Python 3.12, Django 6.0.3, Django REST Framework
- **Frontend:** Angular 21, PrimeNG 21, TypeScript
- **Testing:** pytest (backend), Vitest (frontend)

## Prerequisites

- Python 3.10+
- Node.js 22.12+
- npm

## Getting Started

You'll need two terminal windows — one for the backend, one for the frontend.

### 1. Backend

Open a terminal and run:

    cd poker-hand-evaluator
    python3 -m venv venv
    source venv/bin/activate
    pip install django djangorestframework django-cors-headers pytest pytest-django
    cd backend
    python manage.py runserver

The backend API is now running at `http://localhost:8000/api/`.

Keep this terminal open.

### 2. Frontend

Open a second terminal and run:

    cd poker-hand-evaluator/frontend
    npm install
    npm start

The app is now running at `http://localhost:4200/`. Open this URL in your browser.

### 3. Use the app

- Choose **Pick Cards** to manually select 5 cards using the rank and suit dropdowns
- Or choose **Random Hand** and click **Deal 5 Cards** to get a random hand
- Once you have 5 cards, click **Evaluate Hand** to see the result

## Running Tests

### Backend tests

From the project root, with venv activated:

    cd poker-hand-evaluator
    source venv/bin/activate
    pytest

### Frontend tests

    cd poker-hand-evaluator/frontend
    ng test

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards/` | Returns available ranks and suits |
| GET | `/api/deal/` | Returns 5 random cards |
| POST | `/api/evaluate/` | Evaluates a 5-card hand |

### Example: Evaluate a hand

    curl -X POST http://localhost:8000/api/evaluate/ \
      -H "Content-Type: application/json" \
      -d '{"cards": [
        {"rank": "A", "suit": "Spades"},
        {"rank": "A", "suit": "Hearts"},
        {"rank": "10", "suit": "Clubs"},
        {"rank": "3", "suit": "Diamonds"},
        {"rank": "7", "suit": "Spades"}
      ]}'

Response:

    {"success": true, "data": {"result": "One Pair"}}

## Hand Ranks Implemented

| Priority | Hand | Description |
|----------|------|-------------|
| 1 | High Card | No matching cards |
| 2 | One Pair | Two cards of the same rank |
| 3 | Two Pair | Two different pairs |
| 4 | Three of a Kind | Three cards of the same rank |
| 6 | Flush | All five cards of the same suit |

## Project Structure

    poker-hand-evaluator/
    ├── backend/
    │   ├── config/          # Django settings, URLs
    │   ├── api/             # REST API views, serializers, URLs
    │   ├── engine/          # Poker engine (cards, deck, evaluator, hand ranks)
    │   └── tests/           # Backend unit tests
    ├── frontend/
    │   └── src/app/
    │       ├── components/  # CardPicker, HandDisplay, ResultDisplay
    │       ├── layout/      # App layout with header
    │       ├── pages/       # HandEvaluator page
    │       └── services/    # PokerService (API client)
    └── pyproject.toml

## Design Decisions

- **Engine is framework-independent** — pure Python, no Django imports. Can be used standalone.
- **Auto-registering hand ranks** — new hand ranks register automatically via `__init_subclass__`. Add a new class, it works. No config to edit.
- **Priority-based evaluation** — checks best hand first to avoid misclassifying overlapping patterns (e.g. a Full House contains a pair).
- **Two input modes** — Pick Cards (manual selection) or Random Hand (deal from API). Modes don't mix to avoid confusing state.
- **Signals** — Angular 21 signal-based reactivity for all component state.
- **Global CSS** — simple styling, no component-scoped CSS complexity.

## Future Improvements

### Frontend

- Filter already-selected cards from the rank/suit dropdowns
- Confirmation when switching modes clears the hand
- Show "Redeal" label after first random deal
- Card dealing animation

### Backend

- Add remaining hand ranks: Straight, Full House, Four of a Kind, Straight Flush, Royal Flush
- Make hand rank `check()` methods self-contained (not dependent on evaluation order)
- Use ABC for HandRank base class
- DRY the API response envelope
- Instantiate HandEvaluator once instead of per request
