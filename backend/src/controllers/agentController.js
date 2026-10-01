// backend/src/controllers/agentController.js
global.fetch = require('node-fetch');

const { HfInference } = require('@huggingface/inference');

const APP_CONTEXT = `
You are the AI assistant for WorkConnect, a freelance marketplace.
Your job is to help users understand the platform and navigate it.

Here is some context about the application:
- WorkConnect connects Clients (who post jobs) with Freelancers (who apply for jobs).
- Clients can post jobs, review applications, shortlist candidates, hire freelancers, and manage projects.
- Freelancers can create profiles, browse jobs, apply for jobs, and submit work.
- The platform includes features like messaging, reviews, and a portfolio system.
- Admin users manage the platform, users, and categories.

Based on this context, answer the user's question helpfully and concisely.
`;

const hf = new HfInference(process.env.HF_TOKEN);

exports.chatWithAgent = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const response = await hf.chatCompletion({
      model: 'Qwen/Qwen2.5-7B-Instruct-Turbo', // ✅ Model name update karein
      messages: [
        { role: 'system', content: APP_CONTEXT },
        { role: 'user', content: message }
      ],
      provider: 'together',
      max_tokens: 250,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      reply: reply,
    });
  } catch (error) {
    console.error('Hugging Face Agent Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get response from AI agent.',
    });
  }
};