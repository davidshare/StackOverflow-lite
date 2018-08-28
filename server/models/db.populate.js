import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const hashedPasswd = bcrypt.hashSync('gemshare,php1989@', 10);

const populateUsers = `
  INSERT INTO USERS (fullname, username, email, passwd)
  VALUES('David Itam Essien', 'davidshare', 'davidessienshare@gmail.com', '${hashedPasswd}');
`;

const populateQuestions = `
  INSERT INTO questions (title, description, userid)
  VALUES('How can we prepare the calabar affang soup?', '
    Boil the beef and Kanda with the diced onions and stock cubes in a very small quantity of water. When done, add the dry fish and cook for about 5 more minutes.
    Now add the palm oil, crayfish and pepper. Once it starts boiling, add the afang (okazi) leaves, water leaves and periwinkle. When the okazi leaves have softened and the water has dried up a bit, add salt to taste and leave to simmer for about 5 minutes. The Afang soup is ready!
', 1);

  INSERT INTO questions (title, description, userid)
  VALUES('How to prepare Nigerian jollof rice', '
    Boil the beef and Kanda with the diced onions and stock cubes in a very small quantity of water. When done, add the dry fish and cook for about 5 more minutes.
    Now add the palm oil, crayfish and pepper. Once it starts boiling, add the afang (okazi) leaves, water leaves and periwinkle. When the okazi leaves have softened and the water has dried up a bit, add salt to taste and leave to simmer for about 5 minutes. The Afang soup is ready!
', 1);
`;


const populateQuery = `${populateUsers}${populateQuestions}`;

export default populateQuery;

