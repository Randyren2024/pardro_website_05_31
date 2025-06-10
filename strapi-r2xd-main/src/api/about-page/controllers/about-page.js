'use strict';

/**
 * about-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about-page.about-page', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        company_overview_image: true,
        values_items: true,
        team_members: {
          populate: ['image']
        },
        technology_image: true
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async update(ctx) {
    const response = await super.update(ctx);
    return response;
  }
}));