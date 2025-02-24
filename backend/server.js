   // backend/server.js
   const express = require('express');
   const axios = require('axios');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(cors());
   app.use(express.json());

   app.post('/api/chat', async (req, res) => {
     try {
       const response = await axios.post(
         'https://openrouter.ai/api/v1/chat/completions',
         {
           model: 'openai/gpt-4o-mini',
           messages: req.body.messages,
         },
         {
           headers: {
             Authorization: `Bearer ${process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY}`,
             'Content-Type': 'application/json',
           },
         }
       );
       res.json(response.data);
     } catch (error) {
       console.error('Error fetching response:', error);
       res.status(500).send('Error fetching response');
     }
   });

   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });