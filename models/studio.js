const db = require('../database');

exports.all = async () => {
  const { rows } = await db
    .getPool()
    .query('SELECT * FROM studios ORDER BY id');
  return db.camelize(rows);
};

exports.addStudio = async (studio) => {
  return await db
    .getPool()
    .query(
      'INSERT INTO studios(name, foundation_year, description, image_url) VALUES($1, $2, $3, $4) RETURNING *',
      [studio.name, studio.foundationYear, studio.description, studio.imageUrl]
    );
};

exports.get = async (id) => {
  const { rows } = await db
    .getPool()
    .query('SELECT * FROM studios WHERE id = $1', [id]);
  return db.camelize(rows)[0];
};

exports.getGames = async (studioId) => {
  const { rows } = await db
    .getPool()
    .query('SELECT * FROM games WHERE studio = $1 ORDER BY id', [studioId]);
  return db.camelize(rows);
};

exports.linkGame = async (gameId, studioId) => {
  await db
    .getPool()
    .query('UPDATE games SET studio = $1 WHERE id = $2', [studioId, gameId]);
};
