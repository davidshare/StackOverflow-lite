import bcrypt from 'bcrypt';



const passwordHash = password => bcrypt.hashSync(password, 10);

const comparePasswords = (userPass, hashedPass) => bcrypt.compareSync(userPass, hashedPass);

export default {
  passwordHash,
  comparePasswords,
}