import React from 'react'

const Dashboard = (props) => {
  return(
    <div className='dashboard'>
      {props.session.id}
    </div>
  )
}

export default Dashboard
