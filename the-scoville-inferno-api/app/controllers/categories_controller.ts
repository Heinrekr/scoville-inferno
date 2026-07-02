import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const query = await Category.query().orderBy('updatedAt')
    return response.json({
      data: query,
    })
  }
}
