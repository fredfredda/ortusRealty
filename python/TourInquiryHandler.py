class TourInquiry:
    def __init__(self, time, date, property):
        self.time = time
        self.date = date
        self.property = property
        self.status = 'pending'

    # ------- GETTERS ----------
    def getInfo(self):
        return {
            'time': self.time,
            'date': self.date,
            'property': self.property
        }
    
    # ------ SETTERS ----------
    def setInfo(self, time, date, property):
        self.time = time
        self.date = date
        self.property = property

    def setStatus(self, status):
        self.status = status

class TourInquiryHandler:
    def __init__(self, user):
        self.user = user
        self.inquiredTours = []

    def createTourInquiry(self, time, date, property):
        # create property inquiry in the database
        newTourInquiry = TourInquiry(time, date, property)
        self.inquiredTours.append(newTourInquiry)

    def cancelTourInquiry(self, tourInquiry):
        # check if tourInquiry is in list
        # check the status of the tourInquiry
        # change the property inquiry status from the database
        self.inquiredTours.remove(tourInquiry)
        del propertyInquiry

    def editTourInquiry(self, propertyInquiry, date, propertyy):
        # check if tourInquiry is in list
        # check the status of the tourInquiry
        # update the property inquiry from the database
        # update the inquiredTours list
        propertyInquiry.setInfo(date, propertyy)
    
    def getInquiredTours(self):
        return self.inquiredTours