import React, { useState } from 'react'
import { getIcon } from '../../icons'

const EventTable = ({ history, participants, viewTable }) => {
  const [sortDown, toggleSortDown] = useState(false)

  const handleRedirect = (id) => {
    history.push(`/participants/${id}`)
  }

  const sortByStart = () => {
    if (viewTable === 'Grand Final') {
      sortDown
        ? participants.sort((a, b) => (a.startNr > b.startNr ? 1 : -1))
        : participants.sort((a, b) => (a.startNr < b.startNr ? 1 : -1))
    } else {
      sortDown
        ? participants.sort((a, b) => (a.semiStartNr > b.semiStartNr ? 1 : -1))
        : participants.sort((a, b) => (a.semiStartNr < b.semiStartNr ? 1 : -1))
    }
    toggleSortDown(!sortDown)
  }

  const sortByPoints = () => {
    if (viewTable === 'Grand Final') {
      sortDown
        ? participants.sort((a, b) => (a.points > b.points ? 1 : -1))
        : participants.sort((a, b) => (a.points < b.points ? 1 : -1))
    } else {
      sortDown
        ? participants.sort((a, b) => (a.semiPoints > b.semiPoints ? 1 : -1))
        : participants.sort((a, b) => (a.semiPoints < b.semiPoints ? 1 : -1))
    }
    toggleSortDown(!sortDown)
  }

  const sortByPlace = () => {
    if (viewTable === 'Grand Final') {
      sortDown
        ? participants.sort((a, b) => (a.place > b.place ? 1 : -1))
        : participants.sort((a, b) => (a.place < b.place ? 1 : -1))
    } else {
      sortDown
        ? participants.sort((a, b) => (a.semiPlace > b.semiPlace ? 1 : -1))
        : participants.sort((a, b) => (a.semiPlace < b.semiPlace ? 1 : -1))
    }
    toggleSortDown(!sortDown)
  }

  const showTable = () => {
    let scoreboard = []
    if (viewTable === 'Grand Final') {
      scoreboard = participants.filter((p) => p.final)
    } else if (viewTable === 'First Semifinal') {
      scoreboard = participants.filter((p) => p.semifinal === 1)
    } else if (viewTable === 'Second Semifinal') {
      scoreboard = participants.filter((p) => p.semifinal === 2)
    }

    return scoreboard.map((p) => (
      <tr
        key={p._id}
        onClick={(e) => handleRedirect(p._id)}
        className={p.winner ? 'winner' : null}
      >
        <td>{viewTable === 'Grand Final' ? p.startNr : p.semiStartNr}</td>
        <td className='country-td'>
          <img src={getIcon(p.country.code)} alt={`${p.country.name} flag`} />{' '}
          {p.country.name}
        </td>
        <td className='hide-xs'>{p.artist}</td>
        <td className='hide-sm'>{p.song}</td>
        <td>{viewTable === 'Grand Final' ? p.points : p.semiPoints}</td>
        <td className='hide-md'>
          {viewTable === 'Grand Final' ? p.place : p.semiPlace}
        </td>
      </tr>
    ))
  }

  return (
    <div className='table'>
      <h2 className='section-title'>{viewTable}</h2>
      <table>
        <thead>
          <tr>
            <th>
              R/O
              <i onClick={sortByStart} className='fas fa-sort'></i>
            </th>
            <th>Country</th>
            <th className='hide-xs'>Artist</th>
            <th className='hide-sm'>Song</th>
            <th>
              Points
              <i onClick={sortByPoints} className='fas fa-sort'></i>
            </th>
            <th className='hide-md'>
              Place
              <i onClick={sortByPlace} className='fas fa-sort'></i>
            </th>
          </tr>
        </thead>
        <tbody>{showTable()}</tbody>
      </table>
    </div>
  )
}

export default EventTable
