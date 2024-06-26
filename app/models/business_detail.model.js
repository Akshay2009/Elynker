module.exports = (sequelize, Sequelize) => {
  const BusinessDetail = sequelize.define('business_detail', {
    company_name: {
      type: Sequelize.STRING(100),
    },
    document: {
      type: Sequelize.STRING(200),
    },
    upload_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    is_active: {
      type: Sequelize.INTEGER,
    },
    document_name: {
      type: Sequelize.STRING(100),
    },
    document_number: {
      type: Sequelize.STRING(100),
    },
    file_name: {
      type: Sequelize.STRING(100),
    },
    file_location: {
      type: Sequelize.STRING(200),
    },
    is_provided: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    no_document_reason: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    created_by: {
      type: Sequelize.NUMERIC,
    },
    updated_by: {
      type: Sequelize.NUMERIC,
    },
  }, {
    indexes: [
      {
        fields: ['document_name'], // Add index on the document_name field
      },
      {
        fields: ['document_number'], // Add index on the document_number field
      },
    ],
  });

  return BusinessDetail;
};
