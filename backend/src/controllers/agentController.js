// backend/src/controllers/agentController.js
global.fetch = require('node-fetch');

const { HfInference } = require('@huggingface/inference');

// ... (APP_CONTEXT remains the same)

const hf = new HfInference(process.env.HF_TOKEN);

exports.chatWithAgent = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const response = await hf.chatCompletion({
      model: 'Qwen/Qwen2.5-7B-Instruct',
      messages: [
        { role: 'system', content: APP_CONTEXT },
        { role: 'user', content: message }
      ],
      // ✅ Add the provider parameter here
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