//user authentication configuration file
/*here we are going to put all passport related information
inside the function - inside this function we are going to
initialize passport which we are going make sure to pass into*/

//passport-local strategy
const LocalStrategy = require('passport-local').Strategy
//bcryptjs library
const bcrypt = require('bcryptjs')

function initialize(passport, getUserByName, getUserById){
    //authenticate user function
    //we call done whenever we have authenticated the user
    //we are calling the function durign the login session to make sure
    //the user data typed is correct
    const authenticateUser = async (name, password, done) => {
        const user = await getUserByName(name)
        if(user == null){
            //we are calling null - not error - as error is for server malfunction
            //and here its just a wrong user
            return done(null, false, {message: 'No user with that user name'})
        }
              //if login is correct check password
              try{
                if( await bcrypt.compare(password, user.password)){
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Password incorrect'})
                }
            }catch(e){
                return done(e)
            }
    }
    //passportfield is passport - no need to declare
    //second parameter - user authentication
    passport.use(new LocalStrategy({ usernameField: 'name'}, 
    authenticateUser))
    //passport user serialization
    passport.serializeUser((user, done) => done(null, user.id))
    //we will serialize user as a single id so to deserialize we call id
    passport.deserializeUser((id, done) => {
        //we have to add method getUserById to initialize
        const checkId = getUserById(id)
        return done(null, checkId)
    }
    )
}


module.exports = initialize
