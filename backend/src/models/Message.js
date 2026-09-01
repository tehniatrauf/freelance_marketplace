// backend/src/models/Message.js
const { getConnection, sql } = require('../config/database');

class Message {
  static async create(messageData) {
    const pool = getConnection();
    
    try {
      const result = await pool.request()
        .input('conversationId', sql.VarChar, messageData.conversationId)
        .input('senderId', sql.Int, messageData.senderId)
        .input('receiverId', sql.Int, messageData.receiverId)
        .input('text', sql.NVarChar, messageData.text || null)
        .input('attachments', sql.NVarChar, messageData.attachments ? JSON.stringify(messageData.attachments) : null)
        .input('isRead', sql.Char, 'N')
        .query(`
          INSERT INTO messages (conversation_id, sender_id, receiver_id, text, attachments, is_read)
          OUTPUT INSERTED.id, INSERTED.conversation_id, INSERTED.text, INSERTED.is_read, INSERTED.created_at
          VALUES (@conversationId, @senderId, @receiverId, @text, @attachments, @isRead)
        `);
      
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async getConversations(userId) {
    const pool = getConnection();
    
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(`
        WITH conversation_list AS (
          SELECT 
            conversation_id,
            MAX(created_at) as last_message_time,
            COUNT(CASE WHEN receiver_id = @userId AND is_read = 'N' THEN 1 END) as unread_count
          FROM messages
          WHERE sender_id = @userId OR receiver_id = @userId
          GROUP BY conversation_id
        )
        SELECT 
          cl.conversation_id,
          cl.last_message_time,
          cl.unread_count,
          m.text as last_message_text,
          u.id as participant_id,
          u.name as participant_name,
          u.avatar as participant_avatar,
          u.role as participant_role,
          u.is_active
        FROM conversation_list cl
        CROSS APPLY (
          SELECT TOP 1 text, sender_id, receiver_id
          FROM messages 
          WHERE conversation_id = cl.conversation_id
          ORDER BY created_at DESC
        ) m
        CROSS APPLY (
          SELECT * FROM users 
          WHERE id != @userId
        ) u
        WHERE u.id = 
          CASE 
            WHEN m.sender_id = @userId THEN m.receiver_id
            ELSE m.sender_id
          END
        ORDER BY cl.last_message_time DESC
      `);
    
    return result.recordset;
  }

  static async getMessages(conversationId, userId) {
    const pool = getConnection();
    
    // Mark messages as read
    await pool.request()
      .input('conversationId', sql.VarChar, conversationId)
      .input('userId', sql.Int, userId)
      .query(`
        UPDATE messages 
        SET is_read = 'Y', read_at = GETDATE()
        WHERE conversation_id = @conversationId 
        AND receiver_id = @userId 
        AND is_read = 'N'
      `);
    
    const result = await pool.request()
      .input('conversationId', sql.VarChar, conversationId)
      .query(`
        SELECT 
          m.*,
          s.name as sender_name, s.avatar as sender_avatar,
          r.name as receiver_name, r.avatar as receiver_avatar
        FROM messages m
        LEFT JOIN users s ON m.sender_id = s.id
        LEFT JOIN users r ON m.receiver_id = r.id
        WHERE m.conversation_id = @conversationId
        ORDER BY m.created_at ASC
      `);
    
    return result.recordset.map(row => {
      if (row.attachments) {
        try {
          row.attachments = JSON.parse(row.attachments);
        } catch (e) {
          row.attachments = [];
        }
      }
      return row;
    });
  }
}

module.exports = Message;