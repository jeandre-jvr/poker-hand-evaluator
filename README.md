# Poker Hand Evaluator

A browser-based poker hand evaluator. Submit 5 cards and get the highest ranking hand. Built with Django REST Framework (Python) and Angular.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python 3.12, Django 6.0.3, Django REST Framework |
| Frontend | Angular 21, PrimeNG 21, TypeScript |
| Backend Tests | pytest, pytest-django |
| Frontend Tests | Vitest |

## Prerequisites

- Python 3.10+
- Node.js 22.12+
- npm

## Quick Start

Clone the repo:

    git clone <repo-url>
    cd poker-hand-evaluator

### Start the backend

Open a terminal in the project root:

    python3 -m venv venv        # Create a virtual environment
    source venv/bin/activate     # Activate it
    pip install ".[dev]"         # Install all dependencies from pyproject.toml
    cd backend                   # Move into the backend directory
    python manage.py runserver   # Start the Django dev server

Backend is now running at **http://localhost:8000/api/**. Keep this terminal open.

### Start the frontend

Open a second terminal in the project root:

    cd frontend                  # Move into the frontend directory
    npm install                  # Install Node dependencies
    npm start                    # Start the Angular dev server

Frontend is now running at **http://localhost:4200/**. Open this URL in your browser.

### How to use

The app has two modes:

- **Pick Cards** — Select a rank and suit from the dropdowns, click **Add Card**. Repeat until you have 5 cards. You can remove individual cards by clicking the X on each card.
- **Random Hand** — Click **Deal 5 Cards** to get a random hand from the deck.

Once you have 5 cards, click **Evaluate Hand** to see the best poker hand.

## Running Tests

### Backend

From the project root (`poker-hand-evaluator/`):

    source venv/bin/activate     # Activate the virtual environment
    pytest                       # Run all backend tests

Tests cover card logic, deck, hand evaluator, and API endpoints.

### Frontend

From the frontend directory (`poker-hand-evaluator/frontend/`):

    npm test                     # Run all frontend tests

Tests cover the poker service, all components, and the hand evaluator page.

## API

Three endpoints are available when the backend is running:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards/` | Returns the list of valid ranks and suits |
| GET | `/api/deal/` | Deals a random 5-card hand |
| POST | `/api/evaluate/` | Accepts 5 cards, returns the best hand rank |

### Example request

    curl -X POST http://localhost:8000/api/evaluate/ \
      -H "Content-Type: application/json" \
      -d '{"cards": [
        {"rank": "A", "suit": "Spades"},
        {"rank": "A", "suit": "Hearts"},
        {"rank": "10", "suit": "Clubs"},
        {"rank": "3", "suit": "Diamonds"},
        {"rank": "7", "suit": "Spades"}
      ]}'

### Example response

    {"success": true, "data": {"result": "One Pair"}}

## Hand Ranks

5 of the 10 standard poker hand ranks are implemented:

| Rank | Hand | How it's detected |
|------|------|-------------------|
| 1 | High Card | Fallback — no other pattern matches |
| 2 | One Pair | One rank appears exactly twice |
| 3 | Two Pair | Two different ranks each appear twice |
| 4 | Three of a Kind | One rank appears exactly three times |
| 6 | Flush | All five cards share the same suit |

Adding a new hand rank is simple — create a class that extends `HandRank`, set a name and priority, implement `check()`. It auto-registers itself. See `backend/engine/hands.py`.

## Project Structure

    poker-hand-evaluator/
    ├── backend/
    │   ├── config/              # Django project settings and root URL config
    │   ├── api/                 # REST API — views, serializers, URL routes
    │   ├── engine/              # Poker engine — cards, deck, evaluator, hand ranks
    │   │   ├── card.py          # Card dataclass (immutable)
    │   │   ├── deck.py          # Deck — generates 52 cards, deals random hands
    │   │   ├── evaluator.py     # HandEvaluator — checks hands best-first
    │   │   ├── hands.py         # Hand rank definitions (auto-registering)
    │   │   └── constants.py     # Rank/Suit enums and display mappings
    │   └── tests/               # Backend unit tests
    ├── frontend/
    │   └── src/app/
    │       ├── services/        # PokerService — API client
    │       ├── layout/          # Layout component — header and content shell
    │       ├── pages/           # HandEvaluator page — main app state and logic
    │       └── components/      # UI components — CardPicker, HandDisplay, ResultDisplay
    └── pyproject.toml           # Python project config and dependencies

## Design Decisions

- **Engine is framework-independent** — pure Python, no Django imports. Can be plugged into any Python framework or used standalone.
- **Auto-registering hand ranks** — new hands register automatically via `__init_subclass__`. No config files to edit, no lists to update. Open/Closed Principle.
- **Priority-based evaluation** — evaluator checks from best hand to worst and returns the first match. This prevents misclassifying overlapping patterns (e.g. a Full House contains both a pair and three of a kind).
- **Two input modes** — Pick Cards (manual) or Random Hand (from API). Switching modes clears the hand to avoid mixed state.
- **Angular signals** — all component state uses Angular 21's signal-based reactivity (`signal()`, `computed()`, `input()`, `output()`).
- **Global CSS** — all styling in one file for simplicity. No component-scoped styles.

## Future Improvements

**Frontend**
- Filter already-selected cards from the rank/suit dropdowns
- Confirmation dialog when switching modes would clear existing cards
- Show "Redeal" button label after the first random deal
- Card dealing animation

**Backend**
- Add remaining hand ranks: Straight, Full House, Four of a Kind, Straight Flush, Royal Flush
- Make each `check()` method self-contained (currently relies on evaluation order)
- Use `abc.ABC` and `@abstractmethod` for the HandRank base class
- Extract a response helper to DRY the API envelope pattern
- Instantiate HandEvaluator once at module level instead of per request
