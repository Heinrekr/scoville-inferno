import HeatLevel from '#models/heat_level'
import type { HttpContext } from '@adonisjs/core/http'

export default class HeatLevelsController {
  async index({ response }: HttpContext) {
    const query = await HeatLevel.query().orderBy('updatedAt')
    return response.json({
      data: query,
    })
  }
}
