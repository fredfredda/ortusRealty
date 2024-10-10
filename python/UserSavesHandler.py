class SavedPropertiesHandler:
    def __init__(self, user):
        self.user = user
        self.savedProperties = []

    def saveProperty(self, property):
        self.savedProperties.append(property)
        # create savedproperty in database

    def removeSavedProperty(self, property):
        self.savedProperties.remove(property)
        # delete savedproperty in database

class SavedSearchesHandler:
    def __init__(self, user):
        self.user = user
        self.savedSearches = []

    def saveSearch(self, searchFilter):
        self.savedSearches.append(searchFilter)
        # save the searchFilter in the database as a new record in the saved_searches table

    def deleteSavedSearch(self, searchFilter):
        # check to see if searchFilter is in the savedSearches list
        self.savedSearches.remove(searchFilter)
        # remove the seacrFilter from the database
        del searchFilter

    def editSavedSearch(self, searchFilter):
        # check to see if searchFilter is in the savedSearches list
        # update the saved searches list
        # update the seacrFilter in the database
        del searchFilter