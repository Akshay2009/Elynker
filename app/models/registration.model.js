module.exports = (sequelize, Sequelize) => {
  const Registration = sequelize.define("registration", {
    name: {
      type: Sequelize.STRING(50),
      validate: {
        len: {
          args: [5, 50],
          msg: "Registration Name length must be between 5 to 50 characters",
        },
      },
    },
    image_path: {
      type: Sequelize.TEXT
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
    ip_address: {
      type: Sequelize.STRING(20),
      validate: {
        len: {
          args: [0, 20],
          msg: "IP Address length must be less than equal to 20 characters",
        },
      },
    },
    registration_type: {
      type: Sequelize.INTEGER
    },
    dob: {
      type: Sequelize.DATE
    },
    latitude: {
      type: Sequelize.STRING(20),
      validate: {
        len: {
          args: [0, 20],
          msg: "Latitude length must be less than equal to 20 characters",
        },
      },
    },
    longitude: {
      type: Sequelize.STRING(20),
      validate: {
        len: {
          args: [0, 20],
          msg: "Longitude length must be less than equal to 20 characters",
        },
      },
    },
    steps_completed: {
      type: Sequelize.BOOLEAN
    },
    active_steps: {
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING(50),
      validate: {
        len: {
          args: [0, 50],
          msg: "City length must be less than equal to 50 characters",
        },
      },
    },    
    address1: {
      type: Sequelize.STRING(100),
      validate: {
        len: {
          args: [0, 100],
          msg: "Address1 length must be less than equal to 100 characters",
        },
      },
    },
    address2: {
      type: Sequelize.STRING(100),
      validate: {
        len: {
          args: [0, 100],
          msg: "Address2 length must be less than equal to 100 characters",
        },
      },
    },
    state: {
      type: Sequelize.STRING(100),
      validate: {
        len: {
          args: [0, 100],
          msg: "State Name length must be less than equal to 100 characters",
        },
      },
    },
    country: {
      type: Sequelize.STRING(100),
      validate: {
        len: {
          args: [0, 100],
          msg: "Country length must be less than equal to 100 characters",
        },
      },
    },
    company_name: {
      type: Sequelize.STRING(100),
      validate: {
        len: {
          args: [0,100],
          msg: "Company Name length must be less than equal to  100 characters",
        },
      },
    },
    business_type: {
      type: Sequelize.INTEGER
    },
    business_description : {
      type: Sequelize.TEXT
    },
    education: {
      type: Sequelize.STRING(200),
      validate: {
        len: {
          args: [0, 200],
          msg: "Education length must be less than equal to 200 characters",
        },
      },
    },
    available_hrs_per_week: {
      type: Sequelize.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Available Hours Per Week must be a non-negative numeric value",
        },
      },
    },
    hourly_rate: {
      type: Sequelize.NUMERIC(9,2),
      validate: {
        min: {
          args: [0],
          msg: "Hourly rate must be a non-negative numeric value",
        },
      },
    },
    service_fee: {
      type: Sequelize.NUMERIC(9,2),
      validate: {
        min: {
          args: [0],
          msg: "Service Fee must be a non-negative numeric value",
        },
      },
    },
    currency_id: {
      type: Sequelize.INTEGER
    },
    cover_image: {
      type: Sequelize.STRING
    },
    created_by: {
      type: Sequelize.NUMERIC
    },
    updated_by: {
      type: Sequelize.NUMERIC
    }
  });

  return Registration;
};
