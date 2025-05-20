import MemoryCache from './memory_cache'
import FileCache from './local_file_cache'
// import MongoCache from './mongo_db_cache'

let api
if (process.env.MONGO_DB_URL && process.env.MONGO_DB_NAME) {
  // api = MongoCache
} else if (process.env.ENABLE_FILE_CACHE) {
  api = FileCache
} else {
  api = MemoryCache
}

/**
 * 为减少频繁接口请求，notion数据将被缓存
 * @param {*} key
 * @param force
 * @returns
 */
export async function getDataFromCache(key, force) {
  if (process.env.ENABLE_CACHE || force) {
    const dataFromCache = await api.getCache(key)
    if (JSON.stringify(dataFromCache) === '[]') {
      return null
    }
    return api.getCache(key)
  } else {
    return null
  }
}

export async function setDataToCache(key, data) {
  if (!data) {
    return
  }
  await api.setCache(key, data)
}

export async function getOrSetFromCache(key, func, force) {
  let cacheData = await getDataFromCache(key, force)
  if (!cacheData && func) {
    cacheData = await func()
    await setDataToCache(key, cacheData)
  }
  return cacheData
}

export async function delCacheData(key) {
  if (!process.env.ENABLE_CACHE) {
    return
  }
  await api.delCache(key)
}
