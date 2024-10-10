class City:
    def __init__(self, name, location, category, estimatedPopulation, mapCoordinates, climate):
        self.name = name
        self.location = location
        self.category = category
        self.estimatedPopulation = estimatedPopulation
        self.mapCoordnates = mapCoordinates
        self.climate = climate

    def getCityInfo(self):
        return {
            'name': self.name,
            'location': self.location,
            'category': self.category,
            'estimatedPopulation': self.estimatedPopulation,
            'mapCoordinates': self.mapCoordnates,
            'climate': self.climate
        }
    
class Neighborhood:
    def __init__(self, name, location, category, estimatedPopulation, mapCoordinates, climate, city):
        self.name = name
        self.location = location
        self.category = category
        self.estimatedPopulation = estimatedPopulation
        self.mapCoordnates = mapCoordinates
        self.climate = climate
        self.city = city

    def getNeighborhoodInfo(self):
        return {
            'name': self.name,
            'location': self.location,
            'category': self.category,
            'estimatedPopulation': self.estimatedPopulation,
            'mapCoordinates': self.mapCoordnates,
            'climate': self.climate,
            'city': self.city.name
        }