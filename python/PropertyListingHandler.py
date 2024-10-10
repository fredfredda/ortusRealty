from Property import Land, Home, ConstructionSite, DevelopmentProject

# This class will be instantiated once the site loads
# the server will create property objects from the database add them to the allProperties list
class PropertyListings:
    def __init__(self):
        self.allProperties = []

    def getProperties(self):
        return self.allProperties
    
    def addProperty(self, property):
        self.allProperties.append(property)

    def removeProperty(self, property):
        self.allProperties.remove(property)

    def editProperty(self, property):
        # check if property is in list
        # update the list
        # i should come up with a way to edit a property withou affecting the whole listing
        pass

# this instance will be created first time the admin initiates any action involving property listing
# from then on the server will be requesting data from this instance and not from the database
class PropertyListingHandler:
    def __init__(self):
        # this list will receive data from the database when the admin requests to see the listed properties
        # the server will create property objects that will be appended on this list
        self.__listedProperties = []

    def getListedProperties(self):
        return self.__listedProperties
    
    # ------------ LIST PROPERTY ------------
    def listLand(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        newLand = Land(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category)
        self.__listedProperties.append(newLand)
        PropertyListings.addProperty(newLand)
        # create land in the database

    def listConstructionSite(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        newConstructionSite = ConstructionSite(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category)
        self.__listedProperties.append(newConstructionSite)
        PropertyListings.addProperty(newConstructionSite)
        # create construction site in the database in the database
        
    def listDevelopmentProject(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        newDevelopmentProject = DevelopmentProject(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category)
        self.__listedProperties.append(newDevelopmentProject)
        PropertyListings.addProperty(newDevelopmentProject)
        # create development project in the database

    def listHome(self, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category, internalFeatues, externalFeatures, numOfBeds, numOfBathrooms):
        newHome = Home(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category, internalFeatues, externalFeatures, numOfBeds, numOfBathrooms)
        self.__listedProperties.append(newHome)
        PropertyListings.addProperty(newHome)
        # create home in the database

    # ----------- EDIT PROPERTY --------------
    def editLand(self, land, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        # check if land is in listedProperties
        # update land in the database
        # update the listedProperties list
        land.setInfo(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category)

    def editConstructionSite(self, constructionSite, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        constructionSite.setInfo(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category)
        # check if construction site is in listedProperties
        # update construction site in the database in the database
        # update the listedProperties list
        
    def editDevelopmentProject(self, developmentProject, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category):
        # check if development project is in listedProperties
        # update development project in the database
        # update the listedProperties list
        developmentProject.setInfo(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category)

    def editHome(self, home, name, price, size, location, saleType, neighborhood, description, mapCoordinates, category, internalFeatues, externalFeatures, numOfBeds, numOfBathrooms):
        # check if home is in listedProperties
        # update home in the database
        # update the listedProperties list
        home.setInfo(name, price, size, location, saleType, neighborhood, description, mapCoordinates, category, internalFeatues, externalFeatures, numOfBeds, numOfBathrooms)

    # ----------- DELETE PROPERTY ----------
    def deleteProperty(self, property):
        # check if property is in listedProperties
        # delete the property from the database
        self.listedProperties.remove(property)
        PropertyListings.removeProperty(property)
        del property