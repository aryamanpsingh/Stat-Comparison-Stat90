from rest_framework import routers
from .api import PlayerViewSet
from django.urls import include, path


router = routers.DefaultRouter()
router.register('api/player', PlayerViewSet, 'player')
urlpatterns = router.urls
