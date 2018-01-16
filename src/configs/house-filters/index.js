import baseFilters from '@/configs/house-filters/base.js'
import purchaseFilters from '@/configs/house-filters/purchase.js'
import leaseFilters from '@/configs/house-filters/lease.js'

const types = {
  purchase: purchaseFilters,
  lease: leaseFilters
}

export default function (type) {
  let rawFilters = Object.assign({}, types[type], baseFilters)
  let filters = {}
  for (let field in rawFilters) {
    filters[field] = {
      title: rawFilters[field].title,
      options: {}
    }
    for (let optId in rawFilters[field].options) {
      filters[field].options[optId] = {
        label: rawFilters[field].options[optId],
        selected: false
      }
    }
  }

  return filters
}
