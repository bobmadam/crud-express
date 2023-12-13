const postgresql = require('../database/postgresql')

async function getAllProfile(offset = 0, limit = 20) {
  const data = await postgresql.query(
    `SELECT 
      id_user, 
      name_user, 
      phone, 
      address 
    FROM 
      public.profile 
    ORDER BY 
      id_user DESC OFFSET $1 
    LIMIT 
      $2`,
    [offset, limit]
  )
  return data.rows || []
}

async function getSpecificProfile(idUser) {
  const data = await postgresql.query(
    `SELECT 
      id_user, 
      name_user, 
      phone, 
      address 
    FROM 
      public.profile 
    WHERE 
      id_user = $1`,
    [idUser]
  )
  return data.rows[0] || {}
}

async function insertProfile(input) {
  const data = await postgresql.query(
    `INSERT INTO public.profile (name_user, phone, address) 
      VALUES 
        ($1, $2, $3) RETURNING id_user, 
        name_user, 
        phone, 
        address`,
    [input.nameUser, input.phone, input.address]
  )
  return data.rows[0] || {}
}

async function updateProfile(idUser, input) {
  const data = await postgresql.query(
    `UPDATE 
      public.profile 
    SET 
      name_user = $1, 
      phone = $2, 
      address = $3, 
      updated_at = NOW() 
    WHERE 
      id_user = $4 RETURNING id_user, 
      name_user, 
      phone, 
      address`,
    [input.nameUser, input.phone, input.address, idUser]
  )
  return data.rows[0] || {}
}

async function deleteProfile(idUser) {
  const data = await postgresql.query(
    `DELETE FROM 
      public.profile 
    WHERE 
      id_user = $1`,
    [idUser]
  )
  return data.rowCount || null
}

module.exports = {
  getAllProfile,
  getSpecificProfile,
  insertProfile,
  updateProfile,
  deleteProfile,
}
