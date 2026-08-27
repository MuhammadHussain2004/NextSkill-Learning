const fs = require('fs/promises');
const path= require('path');
const bcrypt = require('bcrypt');

const seedPath = path.join(__dirname, '..', 'data', 'users.json');
const filePath = process.env.VERCEL ? path.join('/tmp', 'users.json') : seedPath;

const readUsers = async ()=> {
    try {
        const fileData = await fs.readFile(filePath , 'utf-8');
        return JSON.parse(fileData);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        if (filePath === seedPath) return [];
        const seedData = await fs.readFile(seedPath, 'utf-8');
        return JSON.parse(seedData);
    }
};

const writeUsers = async (users)=>{
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

exports.createUser = async (userData)=>{
    const users = await readUsers();

    const exists= users.find( (u)=> u.email === userData.email || u.username=== userData.username);
    if (exists){
        throw new Error('User already exists!');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const newUser = {
        id: Date.now(),
        name: userData.name,
        username: userData.username,
        email: userData.email,
        birthday: userData.birthday,
        password: hashedPassword,

    };

    await writeUsers([...users, newUser]);
    return newUser;
};

exports.findUserByEmail = async (email) => {
    const users = await readUsers();
    return users.find((u)=> u.email === email);
};



