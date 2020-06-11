/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commercialparameters', {
    commercial_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    FCC_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fcc',
        key: 'id'
      }
    },
    VOM_Local_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'vom_local',
        key: 'id'
      }
    },
    VOM_Foreign_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'vom_foreign',
        key: 'id'
      }
    },
    WaterCharges_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    LimeStoneCharges_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'limestonecharges',
        key: 'id'
      }
    },
    AshDisposalCost_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'ashdisposalcost',
        key: 'id'
      }
    },
    EscalableComponent_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'escalablecomponent',
        key: 'id'
      }
    },
    NonEscalableComponentForeign_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'nonescalablecomponentforeign',
        key: 'id'
      }
    },
    NonEscalableComponentLocal_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'nonescalablecomponentlocal',
        key: 'id'
      }
    },
    FOMLocal_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fomlocal',
        key: 'id'
      }
    },
    FOMForeign_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fomforeign',
        key: 'id'
      }
    },
    Insurance_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'insurance',
        key: 'id'
      }
    },
    FixedCostOfWorkingCapital_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fixedcostofworkingcapital',
        key: 'id'
      }
    },
    ROE_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'roe',
        key: 'id'
      }
    },
    ROEDC_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'roedc',
        key: 'id'
      }
    },
    ProceedFromCRES_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'proceedfromcres',
        key: 'id'
      }
    },
    WHT_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'wht',
        key: 'id'
      }
    },
    DSRACost_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'dsracost',
        key: 'id'
      }
    },
    FixedFCC_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fixedfcc',
        key: 'id'
      }
    },
    AnnualSecurityCost_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'annualsecuritycost',
        key: 'id'
      }
    },
    Sinosure_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'sinosure',
        key: 'id'
      }
    },
    InterestRateRMB_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'interestratermb',
        key: 'id'
      }
    },
    RepaymentRMB_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    IRSACharges_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'irsacharges',
        key: 'id'
      }
    },
    VariableRate_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'variablerate',
        key: 'id'
      }
    },
    InterestForeignAnnual_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    InterestLocalAnnual_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'interestlocalannual',
        key: 'id'
      }
    },
    FixedCostJetty_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fixedcostjetty',
        key: 'id'
      }
    },
    VariableCostJetty_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'variablecostjetty',
        key: 'id'
      }
    },
    FixedRate_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'fixedrate',
        key: 'id'
      }
    },
    InterestForeignQuarter_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'interestforeignquarter',
        key: 'id'
      }
    },
    OutstandingPrincipleForeignQuarter_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'outstandingprincipleforeignquarter',
        key: 'id'
      }
    },
    OutstandingPrincipleLocalQuarter_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'outstandingprinciplelocalquarter',
        key: 'id'
      }
    },
    InterestLocalQuarter_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'interestlocalquarter',
        key: 'id'
      }
    },
    InterestChargesForeign_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'interestchargesforeign',
        key: 'id'
      }
    },
    InterestChargesKibor_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'InterestChargesKibor',
        key: 'id'
      }
    },
    power_plant_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'powerplant',
        key: 'plant_name'
      }
    }
  }, {
    createdAt:false,
updatedAt:false,
tableName: 'commercialparameters'
  });
};
