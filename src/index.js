import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {sequelize} from './config/database.js';
import userRouter from './routes/v1/user.routes.js';
import onboardingRouter from './routes/v1/onboarding.routes.js';
import userOnboardingRouter from './routes/v1/userOnboarding.routes.js';

/* Initializations */
dotenv.config();
const app = express();

/* Settings */
app.set('port', process.env.PORT || 3001);

/* Middelwares */
app.use(cors({
   origin: '*',
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

/* Routes */
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/onboarding', onboardingRouter);
app.use('/api/v1/user-onboarding', userOnboardingRouter);
app.use((req, res) => {
   res.status(404).json({ message: 'Not found' });
});

/* Start server */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log('Models synchronized');

    // Start the server after the database connection is established
    app.listen(app.get('port'), () => {
      console.log(`Server running on port ${app.get('port')}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with an error code
  }
})();
