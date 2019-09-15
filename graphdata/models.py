from django.db import models
# Create your models here.


class Player(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    league = models.IntegerField()
    apps = models.IntegerField()
    mins = models.IntegerField()
    goals = models.IntegerField()
    assists = models.IntegerField()
    xG = models.FloatField()
    xA = models.FloatField()
    xG90 = models.FloatField()
    xA90 = models.FloatField()
    year = models.IntegerField()


'''
class Player(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)


class Team(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    features = ArrayField(models.CharField(max_length=50), blank=True)
    values = ArrayField(models.IntegerField(), blank=True)


with open('laliga2019.csv') as csvfile:
...     reader = csv.DictReader(csvfile)
...     for row in reader:
...             p = Player(name=row['name'], team=row['team'], apps=row['apps'], mins=row['mins'], goals=row['goals'], assists=row['assists'], xG=row['xG'], xA=row['xA'], xG90=row['xG90'], xA90=row['xG90'], year=row['Year'], league=row['league'])
...             p.save()
'''
