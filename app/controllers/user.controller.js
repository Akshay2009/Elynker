const db = require('../models');
const User = db.user;
const Role = db.role;
const Registration = db.registration;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;
const logErrorToFile = require('../logger');
const serviceResponse = require('../config/serviceResponse');

/**
 * Update user details in the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the update operation.
 */

module.exports.updateUser = async function(req, res) {
  const userId = req.params.id;
  const { name, email, city, mobile_number, country_code, created_by, updated_by} = req.body;
  const [numberOfUpdatedRows, updatedRecords] = await User.update(
    { name, email, mobile_number, city, country_code, created_by, updated_by },
    { where: { id: userId }, returning: true,
  });
  await Registration.update(
    { name, city },
    {
      where: {
        userId: userId,
      },
    },
  );
  if (numberOfUpdatedRows > 0) {
    return res.status(serviceResponse.ok).json(updatedRecords[0]);
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
};

/**
 * Retrieve user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.getUserById = async function(req, res) {
  const userId = req.params.id;
  const user = await User.findOne({
    where: { id: userId },
    include: [{
      model: Role, //  Role is the name of your Roles model
      through: 'user_roles', //  through table name
      as: 'roles' // This alias will be used to access the roles associated with the user
    }]
  });
  if (user) {
    return res.status(serviceResponse.ok).json(user);
  } else {
    return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
  }
};
/**
 * Delete user details by user ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.delUserById = async function(req, res) {
  const { id } = req.params;
  // Fetch the user before deleting
  const userToDelete = await User.findByPk(id);
  if (!userToDelete) {
    return res.status(serviceResponse.notFound).json({ message: serviceResponse.errorNotFound });
  }

  // Now, delete the user
  const deletedUser = await User.destroy({
    where: {
      id: id,
    },
    returning: true,
    raw: true,
  });
  if (deletedUser) {
    return res
      .status(serviceResponse.ok)
      .json({ message: serviceResponse.deletedMessage, userToDelete });
  } else {
    return res.status(serviceResponse.notFound).json({ message: serviceResponse.errorNotFound });
  }
};

/**
 * Search user details by fieldName and  fieldValue from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */

module.exports.search = async function(req, res) {
  try {
    console.log(req.params);
    const { fieldName, fieldValue,} = req.params;
    if (!User.rawAttributes[fieldName]) {
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.fieldNotExistMessage });
    }
    const users = await User.findAll({
      where: {
        [fieldName]: fieldValue,
      },
    });
    if (users.length > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, data: users });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};


/**
 * Retrieve all user details from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the retrieval operation.
 */


module.exports.getAllUser = async function(req, res) {
  try {
    const maxLimit = 50;
    let { page, pageSize } = req.query;
    page = page ? page : 1;
    let offset = 0;
    if (page && pageSize) {
      pageSize = pageSize <= maxLimit ? pageSize : maxLimit;
      offset = (page - 1) * pageSize;
    }

    const { count, rows } = await User.findAndCountAll({
      distinct: true,
      limit: pageSize,
      offset: offset,
      order: [['createdAt', 'ASC']],
      include: [{
        model: Role, //  Role is the name of your Roles model
        through: 'user_roles', // through table name
        as: 'roles', // This alias will be used to access the roles associated with users
      }],
    });
    if (count > 0) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.getMessage, totalRecords: count, data: rows });
    } else {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Create new User By admin with roles
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.userCreateByAdmin = async function(req, res) {
  try {
    const { email, name, city, country_code, mobile_number, username, is_active, roles, created_by, updated_by } = req.body;
    if(!roles){
      return res.status(serviceResponse.badRequest).json({ error: 'Role Not Given'});
    }
    const rolesRecord = await Role.findAll({
      where: {
        name: {
          [Op.or]: roles,
        },
      },
    });
    if(rolesRecord.length===0) {
      return res.status(serviceResponse.notFound).json({ error: 'No Roles Found' });
    }
    const user = await User.create({
      email: email,
      name: name,
      city: city,
      country_code: country_code,
      mobile_number: mobile_number,
      username: username,
      is_active: is_active,
      created_by:created_by,
      updated_by:updated_by
    });
    if(user) {
      await user.setRoles(rolesRecord);
      const authorities = [];
      const userRoles = await user.getRoles();
      for (let i = 0; i < userRoles.length; i++) {
        authorities.push('ROLE_' + userRoles[i].name.toUpperCase());
      }
      return res.status(serviceResponse.saveSuccess).json({ message: serviceResponse.createdMessage, user: user, roles: authorities });
    }else{
      return res.status(serviceResponse.badRequest).json({ error: serviceResponse.errorCreatingRecord });
    }
  } catch (err) {
    logErrorToFile.logErrorToFile(err, 'user.controller', 'createAdminUser');
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message+' '+err.errors[0].message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Update User By admin 
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.updateUserByAdminById = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if(!user) {
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
    const { email, name, city, country_code, mobile_number, username, is_active, roles, created_by, updated_by} = req.body;
    let rolesRecord =  await user.getRoles();
    if (roles) {
      rolesRecord = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });
      if (rolesRecord.length === 0) {
        return res.status(serviceResponse.notFound).json({ error: 'No Roles Found' });
      }
    }    
    const [row, record] = await User.update({
      email: email,
      name: name,
      city: city,
      country_code,
      mobile_number: mobile_number,
      username: username,
      is_active: is_active,
      created_by:created_by,
      updated_by:updated_by
    }, {
      where: {
        id: id,
      },
      returning: true,
    });
    if(row) {
      await record[0].setRoles(rolesRecord);
      const authorities = [];
      const userRoles = await record[0].getRoles();
      for (let i = 0; i < userRoles.length; i++) {
        authorities.push('ROLE_' + userRoles[i].name.toUpperCase());
      }
      return res.status(serviceResponse.ok).json({ message: serviceResponse.updatedMessage, user: record[0], roles: authorities });
    }else{
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    logErrorToFile.logErrorToFile(err, 'user.controller', 'updateUserByAdminById');
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message+' '+err.errors[0].message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: serviceResponse.internalServerErrorMessage });
  }
};

/**
 * Delete User By admin 
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Promise<void>} - Promise representing the completion of the retrieval operation.
 */
module.exports.deleteUserByAdminById = async function(req, res) {
  try{
    const id = req.params.id;
    const userToDelete = await User.findByPk(id);
    const row = await User.destroy({
      where: {
        id: id,
      },
    });
    if(row) {
      return res.status(serviceResponse.ok).json({ message: serviceResponse.deletedMessage, user: userToDelete });
    }else{
      return res.status(serviceResponse.notFound).json({ error: serviceResponse.errorNotFound });
    }
  } catch (err) {
    logErrorToFile.logErrorToFile(err, 'user.controller', 'updateUserByAdminById');
    if (err instanceof Sequelize.Error) {
      return res.status(serviceResponse.badRequest).json({ error: err.message+' '+err.errors[0].message });
    }
    return res.status(serviceResponse.internalServerError).json({ error: 'Internal Server Error' });
  }
};
