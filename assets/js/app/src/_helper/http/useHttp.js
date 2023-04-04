import {http} from './http'
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://localhost:8000'
})


export function useHttp(jwtOverrideConfig = {}) {

 return new http(axiosIns, jwtOverrideConfig)

}
