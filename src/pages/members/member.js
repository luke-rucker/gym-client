import React from 'react'
import { useParams } from 'react-router-dom'

function Member() {
    const { memberId } = useParams()

    return <h1>Member {memberId}</h1>
}

export default Member
