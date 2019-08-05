import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../api'
import { useAppHook } from '../contexts'

const CreateSpotStyle = styled.div`
    border-radius: 1.1em;
    border: 2px solid black;
    display: block;
    padding: 4px 16px;

    & > form {
        display: flex;
        flex-direction: column;

        & * {
            margin: 5px 0px;
            padding: 5px 0px;
        }
    }
`

const CreateSpot = () => {
    const { useSpot } = useAppHook()
    const { _, dispatch } = useSpot

    const [number, setNumber] = useState()
    const [floor, setFloor] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.spot.createSpot({ number, floor })
            alert(res.data.msg)
            setNumber(null)
            setFloor(null)
        } catch (error) {
            alert(error.data.msg)
        }
    }

    return (
        <CreateSpotStyle>
            <Link to='/parking'>Go back</Link>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='enter a number' onChange={e => setNumber(e.target.value)} />
                <input type='text' placeholder='enter a floor' onChange={e => setFloor(e.target.value)} />
                <input type='submit' value='Create spot' />
            </form>
        </CreateSpotStyle>
    )
}

export default CreateSpot