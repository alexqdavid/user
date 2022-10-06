const bcrypt = require('bcryptjs')
const users = []


module.exports = {
    login: (req, res) => {
      console.log('hello user');
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].hashedpassword)
          if (authenticated){
            let userToReturn = {...users[i]}
            delete userToReturn.hashedpassword
            res.status(200).send(userToReturn)
          }
        }
      }
      res.status(400).send("User not found.")
    },


    register: (req, res) => {
      console.log('who are you?');
        const {username, email, firstname, lastname, password} = req.body;  
        
        const hashedpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        let user = {
          username,
          email,
          firstname,
          lastname,
          hashedpassword
        }
        users.push(user)
        let userToReturn = {...users}
        delete userToReturn.hashedpassword
        res.status(200).send(req.body)
    }
  }


