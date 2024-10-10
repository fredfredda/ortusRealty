from User import User, Admin

class UserAccountHandler:
    def __init__(self, user):
        # this will be the current user using the session
        # when the user logs in the server will create a user object with information from the database
        # this user object will be passed in this constructor
        self.user = user 
        

    def createAccount(username, firstName, lastName, email, phoneNumber, password):
        # create new user in the database
        newUser = User(username, firstName, lastName, email, phoneNumber, password)

    def editAccount(user, username, firstName, lastName, email, phoneNumber): # pass in the user object
        # update the user in the database
        user.setUserInfo(username, firstName, lastName, email, phoneNumber)

    def changePassword(user, password):
        user.setPassword(password)
    
    def deleteAccount(user):
        # deleting the user from the database
        # deleteing the user object
        del user

class AdminAccountHandler:
    def __init__(self, admin):
        # this will be the current admin using the session
        # when the admin logs in the site will create an a user object with information from the database
        # this admin object will be passed in this constructor
        self.admin = admin 

    def createAccount(self, firstName, lastName, role, password, email):
        # create new user in the database
        newAdmin = Admin(firstName, lastName, email, role, password)

    def editAccount(admin, password, firstName, lastName, email, role): # pass in the user object
        # update the user in the database
        admin.setUserInfo(firstName, lastName, role, password, email)

    def changePassword(admin, password):
        admin.setPassword(password)
    
    def deleteAccount(admin):
        # deleting the user from the database
        # deleteing the user object
        del admin