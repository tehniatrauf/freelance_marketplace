// backend/src/controllers/agentController.js
const { HfInference } = require('@huggingface/inference');

// Apne application ka context yahan define karein
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

// Initialize Hugging Face client
const hf = new HfInference(process.env.HF_TOKEN);

exports.chatWithAgent = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Hugging Face model ko call karein
    // Yahan hum ek text-generation model use kar rahe hain
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2', // Aap koi bhi free model choose kar sakte hain
      inputs: `${APP_CONTEXT}\n\nUser: ${message}\nAssistant:`,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
        return_full_text: false, // Sirf naya text return karega
      },
    });

    const reply = response.generated_text.trim();

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