import React, { useState, useContext, useEffect, Fragment } from 'react'
import EscContext from '../../context/esc/escContext'
import FormInput from '../forms/FormInput'

const EditParticipant = ({ match, history }) => {
  const escContext = useContext(EscContext)
  const {
    getCountries,
    getEvents,
    loading,
    countries,
    events,
    getParticipant,
    editParticipant,
    participant,
  } = escContext
  const [formData, setFormData] = useState({
    artist: '',
    song: '',
    country: '',
    event: '',
    semifinal: '',
    semiStartNr: '',
    semiPoints: '',
    semiPlace: '',
    final: '',
    startNr: '',
    points: 0,
    winner: '',
    place: '',
    image: '',
    bio: '',
    video: '',
  })

  useEffect(() => {
    countries.length === 0 && getCountries()
    events.length === 0 && getEvents()
    participant === null && getParticipant(match.params.id)

    if (participant !== null) {
      updateFormData()
    }

    // eslint-disable-next-line
  }, [loading, participant])

  const updateFormData = () => {
    setFormData({
      artist: loading || !participant.artist ? '' : participant.artist,
      song: loading || !participant.song ? '' : participant.song,
      country: loading || !participant.country.id ? '' : participant.country.id,
      event: loading || !participant.event._id ? '' : participant.event._id,
      semifinal: loading || !participant.semifinal ? '' : participant.semifinal,
      final: loading || participant.final,
      semiStartNr:
        loading || !participant.semiStartNr ? '' : participant.semiStartNr,
      semiPoints:
        loading || !participant.semiPoints ? '' : participant.semiPoints,
      semiPlace: loading || !participant.semiPlace ? '' : participant.semiPlace,
      startNr: loading || !participant.startNr ? '' : participant.startNr,
      points: loading || !participant.points ? '' : participant.points,
      winner: loading || participant.winner,
      place: loading || !participant.place ? '' : participant.place,
      image: loading || !participant.image ? '' : participant.image,
      bio: loading || !participant.bio ? '' : participant.bio,
      video: loading || !participant.video ? '' : participant.video,
    })
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    editParticipant(match.params.id, formData)
    history.push(`/participants/${participant._id}`)
  }

  return (
    !loading && (
      <div className='container'>
        <div className='form-container'>
          <h1 className='large'>
            <i className='far fa-flag'></i>Edit Participant
          </h1>
          <p>* = required field</p>
          <form className='form' onSubmit={handleSubmit}>
            <FormInput
              type='text'
              placeholder='* Artist Name'
              name='artist'
              value={formData.artist}
              handleChange={handleChange}
            />
            <FormInput
              type='text'
              placeholder='* Song Title'
              name='song'
              value={formData.song}
              handleChange={handleChange}
            />
            {countries.length > 0 && (
              <div className='form-group'>
                <select
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value='0'>* Select a Country</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {events.length > 0 && (
              <div className='form-group'>
                <select
                  name='event'
                  value={formData.event}
                  onChange={handleChange}
                >
                  <option value='0'>* Select a Year</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.year}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className='form-group'>
              <select
                name='semifinal'
                value={formData.semifinal}
                onChange={handleChange}
              >
                <option value={0}>No Semifinals</option>

                <option key={1} value={1}>
                  First Semifinal
                </option>
                <option key={2} value={2}>
                  Second Semifinal
                </option>
              </select>
            </div>
            {formData.semifinal !== '' && (
              <Fragment>
                <FormInput
                  type='number'
                  placeholder='* Start Number in Semifinal'
                  name='semiStartNr'
                  value={formData.semiStartNr}
                  handleChange={handleChange}
                  className='semi-box'
                />
                <FormInput
                  type='number'
                  placeholder='* Points in Semifinal'
                  name='semiPoints'
                  value={formData.semiPoints}
                  handleChange={handleChange}
                  className='semi-box'
                />
                <FormInput
                  type='number'
                  placeholder='* Place in Semifinal'
                  name='semiPlace'
                  value={formData.semiPlace}
                  handleChange={handleChange}
                  className='semi-box'
                />
              </Fragment>
            )}
            <div className='form-group'>
              <p>
                <input
                  type='checkbox'
                  name='final'
                  checked={formData.final}
                  value={formData.final}
                  onChange={() => {
                    setFormData({ ...formData, final: !formData.final })
                  }}
                />{' '}
                Grand Final
              </p>
            </div>
            {formData.final && (
              <Fragment>
                <FormInput
                  type='number'
                  placeholder='* Start Number'
                  name='startNr'
                  value={formData.startNr}
                  handleChange={handleChange}
                />
                <FormInput
                  type='number'
                  placeholder='* Points'
                  name='points'
                  value={formData.points}
                  handleChange={handleChange}
                />
                <FormInput
                  type='number'
                  placeholder='* Place'
                  name='place'
                  value={formData.place}
                  handleChange={handleChange}
                />
              </Fragment>
            )}

            <div className='form-group'>
              <p>
                <input
                  type='checkbox'
                  name='winner'
                  checked={formData.winner}
                  value={formData.winner}
                  onChange={() => {
                    setFormData({ ...formData, winner: !formData.winner })
                  }}
                />{' '}
                Winner
              </p>
            </div>
            <FormInput
              type='text'
              placeholder='Participant Image'
              name='image'
              value={formData.image}
              handleChange={handleChange}
              required={false}
              small='Image from the participant'
            />
            <FormInput
              type='textarea'
              placeholder='Event Bio'
              name='bio'
              value={formData.bio}
              handleChange={handleChange}
              small='Write a bio of the participant. Separate each paragraph with *'
              required={false}
            />
            <FormInput
              type='text'
              placeholder='Video id'
              name='video'
              value={formData.video}
              handleChange={handleChange}
              required={false}
              small='Youtube id'
            />
            <input type='submit' className='btn btn-primary my-1' />
          </form>
        </div>
      </div>
    )
  )
}

export default EditParticipant
