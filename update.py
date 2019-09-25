import os
import csv
from graphdata.models import Player

# Serie A
csvInfo = [
    {
        'name': "premierleague2019.csv",
        'year': 2019,
        'league': 1
    },
    {
        'name': "premierleague2018.csv",
        'year': 2018,
        'league': 1
    }
]
for season in csvInfo:
    try:
        Player.objects.filter(
            league=season["league"], year=season["year"]).delete()
    except:
        Player.objects.filter(
            league=season["league"], year=season["Year"]).delete()
        '''
    with open(season["name"]) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            p = Player(name=row['name'], team=row['team'], apps=row['apps'], mins=row['mins'], goals=row['goals'], assists=row['assists'],
                       xG=row['xG'], xA=row['xA'], xG90=row['xG90'], xA90=row['xG90'], year=row['year'], league=row['league'])
            p.save()
            '''
'''
    {
        'name': "premierleague2019.csv",
        'year': 2019,
        'league': 1
    },
    {
        'name': "premierleague2018.csv",
        'year': 2018,
        'league': 1
    },
    {
        'name': "laliga2019.csv",
        'year': 2019,
        'league': 2
    },
    {
        'name': "laliga2018.csv",
        'year': 2018,
        'league': 2
    },
    '''
'''
    {

        'name': "serieA2019.csv",
        'year': 2019,
        'league': 3
    },
    {
        'name': "serieA2018.csv",
        'year': 2018,
        'league': 3
    },
    {
        'name': "bundesliga2018.csv",
        'year': 2018,
        'league': 4
    },
    {
        'name': "bundesliga2019.csv",
        'year': 2019,
        'league': 4
    },
    {
        'name': "ligue12018.csv",
        'year': 2018,
        'league': 5
    },
    {
        'name': "ligue12019.csv",
        'year': 2019,
        'league': 5
    }
'''

''',
    {
        'name': "laliga2019.csv",
        'year': 2019,
        'league': 2
    },
    {
        'name': "laliga2018.csv",
        'year': 2018,
        'league': 2
    }
    '''
