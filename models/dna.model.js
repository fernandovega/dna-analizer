module.exports = (sequelize, Sequelize) => {
    const Dna = sequelize.define("dnas", {
      body: {
        type: Sequelize.STRING
      },
      mutation: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Dna;
  };