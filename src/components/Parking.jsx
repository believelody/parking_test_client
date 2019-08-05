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
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  padding: 12px;
`

const Spot = ({spot}) => {
  const { useSpot, useUser } = useAppHook()
  const [{user}, _] = useUser
  const [{}, dispatchSpot] = useSpot

  const handleClick = async () => {
    try {
      const res = await api.spot.assignSpotToUser(spot.id, user.id)
      alert(res.data.msg)
    } catch (error) {
      alert(error.data.msg)
    }
  }

  return (
    <SpotStyle>
      <span>Number: {spot.number}</span>
      <span>Floor: {spot.floor}</span>
      <span>Occupied: {spot.occupied}</span>
      {!spot.occupancy && <button onClick={handleClick}>Take spot</button>}
    </SpotStyle>
  )
}

const Parking = () => {
  const { useSpot } = useAppHook()
  const [{spots}, dispatch] = useSpot

  useEffect(() => {
    const getSpots = async () => {
      const res = await api.spot.fetchAllSpots()
      const { data } = res
      dispatch({ type: ALL_SPOTS, payload: data })
    }

    if (spots.length === 0) {
      getSpots()
    }
  }, [])

  return (
    <SpotsStyle>
      {spots.length === 0 && <h3>No spots found. <span><Link to='/create-spot'>Create one</Link></span></h3>}
      {
        <div>
          <span className='go-to-create'><Link to='/create-spot'>Create Spot</Link></span>
          <br />
          <ul>{spots.length > 0 && spots.map(spot => <Spot key={spot.id} spot={spot} />)}</ul>
        </div>
      }
    </SpotsStyle>
  )
}

export default Parking
