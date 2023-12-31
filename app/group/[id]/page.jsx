import React from 'react'

const Group = ({params}) => {
    const groupId = params['id']
    return (
        <div> 
            Viewing group {groupId} 
            <p> It should have list of meets listed </p>
        </div>
    )
}

export default Group