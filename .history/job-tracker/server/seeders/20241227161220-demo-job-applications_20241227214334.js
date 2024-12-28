'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('JobApplications', [
      {
        jobId: 'J001',
        userId: 'U001',
        company: 'Google',
        position: 'Software Engineer',
        status: 'Applied',
        notes: 'First round scheduled',
        dateApplied: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        jobId: 'J002',
        userId: 'U001',
        company: 'Amazon',
        position: 'Data Scientist',
        status: 'Interview',
        notes: 'Completed technical interview',
        dateApplied: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('JobApplications', null, {});
  },
};
