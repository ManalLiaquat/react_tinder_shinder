import * as API from '../../Constants/Api'

async function searchApi(myLocation, searchTerm) {
  let res = await fetch(`${API.PATH_BASE}/venues/search?${API.CLIENT_ID}&${API.CLIENT_SECRET}&${API.V}&query=${searchTerm}&ll=${myLocation[0]},${myLocation[1]}&${API.RADIUS}`)
  return res.json()
}

export default searchApi