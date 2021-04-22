import React, { useState, useEffect, useContext } from 'react'
import EscContext from '../../context/esc/escContext'
import FormInput from '../forms/FormInput'

const EditEvent = ({ match, history }) => {
  const escContext = useContext(EscContext)
  const {
    getCountries,
    loading,
    countries,
    getEvent,
    event,
    editEvent,
  } = escContext

  const [formData, setFormData] = useState({
    year: '',
    country: '',
    city: '',
    image: '',
    logo: '',
    bio: '',
    video: '',
  })

  useEffect(() => {
    getCountries()
    getEvent(match.params.id)

    if (event !== null) {
      setFormData({
        year: loading || !event.event.year ? '' : event.event.year,
        country:
          loading || !event.event.country.id ? '' : event.event.country.id,
        city: loading || !event.event.city ? '' : event.event.city,
        image: loading || !event.event.image ? '' : event.event.image,
        logo: loading || !event.event.logo ? '' : event.event.logo,
        bio: loading || !event.event.bio ? '' : event.event.bio,
        video: loading || !event.event.video ? '' : event.event.video,
      })
    }
    // eslint-disable-next-line
  }, [])

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    editEvent(match.params.id, formData)
    history.push('/')
  }
  return (
    !loading && (
      <div className='container'>
        <div className='form-container'>
          <h1 className='large'>
            <i className='far fa-flag'></i>Edit Event
          </h1>
          <p>* = required field</p>
          <form className='form' onSubmit={handleSubmit}>
            <FormInput
              type='number'
              placeholder='* Event Year'
              name='year'
              value={formData.year}
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
            <FormInput
              type='text'
              placeholder='* Event City'
              name='city'
              value={formData.city}
              handleChange={handleChange}
            />
            <FormInput
              type='text'
              placeholder='* Event Logo'
              name='logo'
              value={formData.logo}
              handleChange={handleChange}
            />
            <FormInput
              type='text'
              placeholder='Event Image'
              name='image'
              value={formData.image}
              handleChange={handleChange}
              required={false}
              small='Image from the event'
            />
            <FormInput
              type='textarea'
              placeholder='Event Bio'
              name='bio'
              value={formData.bio}
              handleChange={handleChange}
              small='Write a bio of the event. Separate each paragraph with *'
              required={false}
            />
            <FormInput
              type='text'
              placeholder='Video Link'
              name='video'
              value={formData.video}
              handleChange={handleChange}
              required={false}
              small='Link to video of country in Eurovision Song Contest'
            />
            <input type='submit' className='btn btn-primary my-1' />
          </form>
        </div>
      </div>
    )
  )
}

export default EditEvent
