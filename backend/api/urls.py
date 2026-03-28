from django.urls import path
from api.views import CardView, RandomHandView, EvaluateView

urlpatterns = [
    path('cards/', CardView.as_view()),
    path('deal/', RandomHandView.as_view()),
    path('evaluate/', EvaluateView.as_view()),
]
