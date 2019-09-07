from rest_framework import viewsets, permissions, generics, status
from .serializers import PlayerSerializer
from .models import Player
from rest_framework.response import Response
from django.http import Http404


class PlayerViewSet (viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
