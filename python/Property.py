from abc import ABC

class Property(ABC):
    def __init__(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates

class Land(property):
    propertyType = 'land'
    def __init__(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category

    # ------ GETTERS --------
    def getInfo(self):
        return {
            'name': self.name,
            'price': self.price,
            'size': self.size,
            'location': self.location,
            'saleType': self.saleType,
            'neighborhood': self.neighborhood.name,
            'description': self.description,
            'mapCoordinates': self.mapCoordinates,
            'category': self.category
        }
    
    # ---------- SETTERS ---------
    def setInfo(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category

class Home(property):
    propertyType = 'home'
    def __init__(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category, internalFeatues, externalFeatures, numOfBeds, numOfBathrooms):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category
        self.internalFeatures = internalFeatues
        self.externalFeatures = externalFeatures
        self.numOfBeds = numOfBeds
        self.numOfBathrooms = numOfBathrooms

    # ------ GETTERS --------
    def getInfo(self):
        return {
            'name': self.name,
            'price': self.price,
            'size': self.size,
            'location': self.location,
            'saleType': self.saleType,
            'neighborhood': self.neighborhood.name,
            'description': self.description,
            'mapCoordinates': self.mapCoordinates,
            'category': self.category,
            'internalFeatures': self.internalFeatures,
            'externalFeatures': self.externalFeatures,
            'numOfBeds': self.numOfBeds,
            'numOfBathrooms': self.numOfBathrooms
        }
    
    # ---------- SETTERS ---------
    def setInfo(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category, internalFeatues, externalFeatures, numOfBeds, numOfBathrooms):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category
        self.internalFeatures = internalFeatues
        self.externalFeatures = externalFeatures
        self.numOfBeds = numOfBeds
        self.numOfBathrooms = numOfBathrooms

class ConstructionSite(property):
    propertyType = 'construction site'
    def __init__(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category

    # ------ GETTERS --------
    def getInfo(self):
        return {
            'name': self.name,
            'price': self.price,
            'size': self.size,
            'location': self.location,
            'saleType': self.saleType,
            'neighborhood': self.neighborhood.name,
            'description': self.description,
            'mapCoordinates': self.mapCoordinates,
            'category': self.category
        }
    
    # ---------- SETTERS ---------
    def setInfo(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category

class DevelopmentProject(property):
    propertyType = 'construction site'
    def __init__(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category

    # ------ GETTERS --------
    def getInfo(self):
        return {
            'name': self.name,
            'price': self.price,
            'size': self.size,
            'location': self.location,
            'saleType': self.saleType,
            'neighborhood': self.neighborhood.name,
            'description': self.description,
            'mapCoordinates': self.mapCoordinates,
            'category': self.category
        }
    
    # ---------- SETTERS ---------
    def setInfo(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        self.name = name
        self.price = price
        self.size = size
        self.location = location
        self.saleType = saleType
        self.neighborhood = neighborhood
        self.description = description
        self.mapCoordinates = mapCoordinates
        self.category = category