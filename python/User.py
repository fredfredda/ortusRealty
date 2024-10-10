class User:
    def __init__(self, username, firstName, lastName, email, phoneNumber, password):
        self.username = username
        self.__firstName = firstName
        self.__lastName = lastName
        self.__email = email
        self.__phoneNumber = phoneNumber
        self.__password = password

    # ------------ GETTERS ------------
    def getUserInfo(self):
        return {'username': self.username, 
                'firstName': self.__firstName,
                'lastName': self.__lastName,
                'email': self.__email,
                'phoneNumber': self.__phoneNumber}
    
    def getUsername(self):
        return self.username
    
    def getPassword(self):
        return self.__password
    
    # ----------- SETTERS ------------
    def setUserInfo(self, username, firstName, lastName, email, phoneNumber):
        self.username = username
        self.__firstName = firstName
        self.__lastName = lastName
        self.__email = email
        self.__phoneNumber = phoneNumber

    def setPassword(self, password):
        self.__password = password

class Admin:
    def __init__(self, firstName, lastName, role, password, email):
        self.__firstname = firstName
        self.__lastName = lastName
        self.__email = email
        self.__password = password
        self.__role = role

    # ------------ GETTERS ------------
    def getUserInfo(self):
        return {'firstName': self.__firstName,
                'lastName': self.__lastName,
                'email': self.__email,
                'role': self.__role}
    
    def getPassword(self):
        return self.__password
    
    # ----------- SETTERS ------------
    def setUserInfo(self, firstName, lastName, role, password, email):
        self.__firstName = firstName
        self.__lastName = lastName
        self.__role = role
        self.__password = password
        self.__email = email

    def setPassword(self, password):
        self.__password = password