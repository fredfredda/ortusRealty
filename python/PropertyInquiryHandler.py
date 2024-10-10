class PropertyInquiry:
    def __init__(self, date, property):
        self.date = date
        self.property = property
        self.status = 'pending'

    # ------- GETTERS ----------
    def getInfo(self):
        return {
            'date': self.date,
            'property': self.property
        }
    
    # ------ SETTERS ----------
    def setInfo(self, date, property):
        self.date = date
        self.property = property

    def setStatus(self, status):
        self.status = status

class PropertyInquiryHandler:
    def __init__(self, user):
        self.user = user
        # this list will receive data from the database when the user requests to see his property inquiries
        # the server will create propertyInquiry objects that will be appended on this list
        self.propertyInquiries = []

    def createPropertyInquiry(self, date, property):
        # create property inquiry in the database
        newPropertyInquiry = PropertyInquiry(date, property)
        self.propertyInquiries.append(newPropertyInquiry)

    def cancelPropertyInquiry(self, propertyInquiry):
        # check if inquiry is in property inquiries list
        # check inquiry status
        # change the property inquiry status from the database
        self.propertyInquiries.remove(propertyInquiry)
        del propertyInquiry

    def editPropertyInquiry(self, propertyInquiry, date, propertyy):
        # check if inquiry is in property inquiries list
        # check inquiry status
        # update the property inquiry from the database
        # update the propertyInquiries list
        propertyInquiry.setInfo(date, propertyy)

    def confirmPropertyInquiryAcceptance(self, propertyInquiryAcceptance):
        # confirm the has to agreed to buy the property
        pass
    
    def getInquiredProperties(self):
        return self.propertyInquiries

class AdminPropertyinquiryhandler:
    def __init__(self):
        # this list will receive data from the database when the admin requests to see property inquiries
        # the server will create propertyInquiry objects that will be appended on this list
        self.propertyInquiries = [] 

    def foregoPropertyInquiry(self, propertyInquiry):
        # check if inquiry is in property inquiries list
        # check inquiry status
        # update inquiry status in the database
        propertyInquiry.setStatus('rejected')
    
    def agreePropertyInquiry(self, propertyInquiry):
        # check if inquiry is in property inquiries list
        # check inquiry status
        # send the user a property inquiry acceptance for them to confirm
        # update inquiry status in the datbase
        propertyInquiry.setStatus('agreed')