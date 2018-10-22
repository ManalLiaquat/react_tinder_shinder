import * as API from '../../Constants/Api'

async function exploreApi(myLocation) {
  let res = await fetch(`${API.PATH_BASE}/venues/explore?${API.CLIENT_ID}&${API.CLIENT_SECRET}&${API.V}&ll=${myLocation[0]},${myLocation[1]}&${API.RADIUS}&${API.LIMIT}&${API.SORT_BY_DISTANCE}`)
  return res.json()
}

export default exploreApi