// const db = require("../database");

// exports.all = async () => {
//   const { rows } = await db.getPool().query("SELECT * FROM games ORDER BY id");
//     return db.camelize(rows);
//   }
  
//   // exports.addGame = async (game) => {
//   // const releaseDateUTC = new Date(game.releaseDate).toUTCString();
//   //   return await db.getPool()
//   //     .query("INSERT INTO games(title, studio, release_date, description, image_url, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
//   //       [game.title, game.studio, releaseDateUTC, game.description, game.imageUrl, game.status]);
//   // }
//   exports.addGame = async (game) => {
//     if (game.id) {
//       const releaseDateUTC = new Date(game.releaseDate).toUTCString();
//       await db.getPool().query(
//         "UPDATE games SET title = $1, studio = $2, release_date = $3, description = $4, image_url = $5, status = $6 WHERE id = $7",
//         [game.title, game.studio, releaseDateUTC, game.description, game.imageUrl, game.status, game.id]
//       );
//       return { rowCount: 1 }; 
//     } else {
//       const releaseDateUTC = new Date(game.releaseDate).toUTCString();
//       return await db.getPool().query(
//         "INSERT INTO games(title, studio, release_date, description, image_url, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
//         [game.title, game.studio, releaseDateUTC, game.description, game.imageUrl, game.status]
//       );
//     }
//   };
  
//   exports.getCommentsWithTimestamps = async (gameId) => {
//     const { rows } = await db.getPool().query("SELECT * FROM games_comments WHERE game_id = $1 ORDER BY comment_date DESC", [gameId]);
//     return db.camelize(rows);
// };

//   exports.get = async (id) => {
//     const { rows } = await db.getPool().query("SELECT * FROM games WHERE id = $1", [id]);
//     return db.camelize(rows)[0];
//   }

// exports.getComments = async (gameId) => {
//     const { rows } = await db.getPool().query("SELECT * FROM games_comments WHERE game_id = $1 ORDER BY comment_date DESC", [gameId]);
//     return db.camelize(rows);
//   }
  
// // exports.addComment = async (gameId, userId, commentText) => {
// //     return await db.getPool()
// //       .query("INSERT INTO games_comments(game_id, user_id, comment_text, comment_date) VALUES($1, $2, $3, NOW()) RETURNING *",
// //         [gameId, userId, commentText]);
// //   }
// exports.addComment = async (gameId, userId, commentText) => {
//   const commentDate = new Date();
//   await db.getPool().query(
//     "INSERT INTO games_comments(game_id, user_id, comment_text, comment_date) VALUES($1, $2, $3, $4) RETURNING *",
//     [gameId, userId, commentText, commentDate]
//   );
// };

  
const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query('SELECT * FROM games ORDER BY id');
  return db.camelize(rows);
};

exports.addGame = async (game) => {
  if (game.id) {
    const releaseDateUTC = new Date(game.releaseDate).toUTCString();
    await db.getPool().query(
      "UPDATE games SET title = $1, studio = $2, release_date = $3, description = $4, image_url = $5, status = $6 WHERE id = $7",
      [game.title, game.studio, releaseDateUTC, game.description, game.imageUrl, game.status, game.id]
    );
    return { rowCount: 1 }; // Indicate update
  } else {
    const releaseDateUTC = new Date(game.releaseDate).toUTCString();
    const result = await db.getPool().query(
      "INSERT INTO games (title, studio, release_date, description, image_url, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [game.title, game.studio, releaseDateUTC, game.description, game.imageUrl, game.status]
    );
    return result.rows[0]; // Indicate creation
  }
};

exports.getCommentsWithTimestamps = async (gameId) => {
  const { rows } = await db.getPool().query("SELECT * FROM games_comments WHERE game_id = $1 ORDER BY comment_date DESC", [gameId]);
  return db.camelize(rows);
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query('SELECT * FROM games WHERE id = $1', [id]);
  return db.camelize(rows)[0];
};

exports.getComments = async (gameId) => {
  const { rows } = await db.getPool().query("SELECT * FROM games_comments WHERE game_id = $1", [gameId]);
  return db.camelize(rows);
};

exports.addComment = async (gameId, userId, commentText) => {
  const commentDate = new Date();
  await db.getPool().query(
    "INSERT INTO games_comments (game_id, user_id, comment_text, comment_date) VALUES ($1, $2, $3, $4) RETURNING *",
    [gameId, userId, commentText, commentDate]
  );
};
