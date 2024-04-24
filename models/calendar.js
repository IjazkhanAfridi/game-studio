const db = require("../database");

exports.addCommentDate = async (userId, commentDate) => {
  return await db.getPool()
    .query("INSERT INTO calendar(user_id, comment_date) VALUES($1, $2) RETURNING *",
      [userId, commentDate]);
}

exports.getCommentDatesByUserId = async (userId) => {
  const { rows } = await db.getPool().query("SELECT * FROM games_comments WHERE user_id = $1 ORDER BY comment_date DESC LIMIT 1", [userId]);
  return db.camelize(rows);
}
