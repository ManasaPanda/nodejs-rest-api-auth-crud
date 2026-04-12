require('dotenv').config();
const app = require('./app');


const sequelize = require('./config/db');

require('./models/user.model')


sequelize.authenticate().then(() => {
    console.log('Database connected...');
    return sequelize.sync();
}).catch(err => {
    console.log('Error: ' + err);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
