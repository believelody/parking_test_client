import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../api'
import { useAppHook } from '../contexts';
import { ALL_SPOTS } from '../reducers/spotReducer';

const SpotsStyle = styled.div`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  & > div {
    width: 100%;

    & > .go-to-create {
      float: right;
    }

    & > ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      & > li {
        max-width: 100px;
        margin: 4px;
      }
    }
  }
`

const SpotStyle = styled.li`
  border-radius: .7em;
  border: ${props => props.occupancy ? 'none' : '1px solid #ccc'}
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;
  padding: 12px;
`

const UserSpotStyle = styled.div``

const UserSpot = ({ spot, handleClick }) => {
  return (
    <UserSpotStyle>
      <span>Your car is on spot °{spot.number} on floor {spot.floor}</span>
      <button onClick={e => handleClick(spot)}>Free Spot</button>
    </UserSpotStyle>
  )
}

const Spot = ({spot, user, handleClick}) => {
  const [color, setColor] = useState('#fff')

  useEffect(() => {
    if (spot.occupancy && user) {
      if (spot.userId === user.id) {
        setColor('skyblue')
      }
      else {
        setColor('#ccc')
      }
    }
  }, [spot.occupancy, user])

  return (
    <SpotStyle color={color} occupancy={spot.occupancy}>
      <span>Number: {spot.number}</span>
      <span>Floor: {spot.floor}</span>
      <span>Occupied: {spot.occupied}</span>
      <button onClick={e => handleClick(spot)}>Take spot</button>
    </SpotStyle>
  )
}

const Parking = () => {
  const { useSpot, useUser } = useAppHook()
  const [{ user }, _] = useUser
  const [{ spots }, dispatch] = useSpot
  
  const [profile, setProfile] = useState(null)
  const [spotFromUser, setSpot] = useState(null)
  
  const handleClick = async (spot) => {
    try {
      let userId = !spot.occupancy ? user.id : null
      const res = await api.spot.assignSpotToUser(spot.id, userId)
      alert(res.data.msg)
    } catch (error) {
      alert(error.data.msg)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await api.user.fetchOneUser(user.id)
      setProfile(res.data)
    }
    getUser()
  }, [])

  useEffect(() => {    
    const getSpotByUser = async () => {
      const res = await api.spot.searchByUser(user.id)
      console.log(res.data)
      setSpot(res.data)
    }
    if (!spotFromUser) getSpotByUser()    
  }, [spotFromUser, spots])

  useEffect(() => {
    let data = null
    const getSpots = async () => {
      const res = await api.spot.getFreeSpots()
      data = res.data
      dispatch({ type: ALL_SPOTS, payload: data })
    }

    if (spots.length === 0 || spots !== data) {
      getSpots()
    }
  }, [spots])

  return (
    <SpotsStyle>
      {spots.length === 0 && <h3>No spots found. <span><Link to='/create-spot'>Create one</Link></span></h3>}
      {
        <div>
          <span className='go-to-create'><Link to='/create-spot'>Create Spot</Link></span>
          <br />
          {
            spotFromUser &&
            <UserSpot spot={spotFromUser} handleClick={handleClick} />
          }
          {
            !spotFromUser &&
            <ul>
            {spots.length > 0 && spots.map(spot => <Spot key={spot.id} spot={spot} user={profile} handleClick={handleClick} />)}
            </ul>
          }
        </div>
      }
    </SpotsStyle>
  )
}

export default Parking
