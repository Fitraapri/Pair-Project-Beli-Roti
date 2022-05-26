const fs = require('fs')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);

// console.log(hash);

let data = JSON.parse(fs.readFileSync('./PP-usersUpdate.json','utf8'))

data.map(e => {
    e.NewPassword = bcrypt.hashSync(e.password,salt)
    return e
})

console.log(data);

let newData = [
    {
      username: 'admin1',
      email: 'jedmans0@dailymail.co.uk',
      role: 'admin',
      address: 'Ciumbuleuit 94',
      password: '$2a$10$RYe1y1ViRS8Wx4LaALLVwOk5/IXaam7FYjAuFf6ByKFspWXJ2iZWC'
    },
    {
      username: 'admin2',
      email: 'bcallen2@linkedin.com',
      role: 'admin',
      address: 'Sulanjana 17',
      password: '$2a$10$RYe1y1ViRS8Wx4LaALLVwOk5/IXaam7FYjAuFf6ByKFspWXJ2iZWC'
    },
    {
      username: 'admin3',
      email: 'bgoskar4@biblegateway.com',
      role: 'admin',
      address: 'Sulanjana 14',
      password: '$2a$10$RYe1y1ViRS8Wx4LaALLVwOk5/IXaam7FYjAuFf6ByKFspWXJ2iZWC'
    }
]

newData.map(e => {
    JSON.stringify(e)
})

log
  