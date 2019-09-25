import os
import csv
from graphdata.models import Player
'''
Player.objects.filter(league=1, year=2019).delete()
with open('premierleague2019.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        p = Player(name=row['name'], team=row['team'], apps=row['apps'], mins=row['mins'], goals=row['goals'], assists=row['assists'],
                   xG=row['xG'], xA=row['xA'], xG90=row['xG90'], xA90=row['xG90'], year=row['year'], league=row['league'])
        p.save()
'''
print(Player)
