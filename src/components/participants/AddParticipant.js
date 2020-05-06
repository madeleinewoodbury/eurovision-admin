import React, { useState, useContext, useEffect } from 'react';
import EscContext from '../../context/esc/escContext';
import FormInput from '../forms/FormInput';

const AddParticipant = ({ history }) => {
  const escContext = useContext(EscContext);
  const {
    getCountries,
    getEvents,
    loading,
    countries,
    events,
    addParticipant,
  } = escContext;
  const [formData, setFormData] = useState({
    artist: '',
    song: '',
    country: '',
    event: '',
    final: true,
    startNr: '',
    points: '',
    winner: false,
    place: '',
    image: '',
    bio: '',
    video: '',
  });

  useEffect(() => {
    countries.length === 0 && getCountries();
    events.length === 0 && getEvents();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addParticipant(formData);
    history.push('/');
  };

  return (
    !loading && (
      <div className="container">
        <div className="form-container">
          <h1 className="large">
            <i className="far fa-flag"></i>Add a New Participant
          </h1>
          <p>* = required field</p>
          <form className="form" onSubmit={handleSubmit}>
            <FormInput
              type="text"
              placeholder="* Artist Name"
              name="artist"
              value={formData.artist}
              handleChange={handleChange}
            />
            <FormInput
              type="text"
              placeholder="* Song Title"
              name="song"
              value={formData.song}
              handleChange={handleChange}
            />
            {countries.length > 0 && (
              <div className="form-group">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="0">* Select a Country</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {events.length > 0 && (
              <div className="form-group">
                <select
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                >
                  <option value="0">* Select a Year</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.year}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="final"
                  checked={formData.final}
                  value={formData.final}
                  onChange={() => {
                    setFormData({ ...formData, final: !formData.final });
                  }}
                />{' '}
                Grand Final
              </p>
            </div>
            <FormInput
              type="number"
              placeholder="* Start Number"
              name="startNr"
              value={formData.startNr}
              handleChange={handleChange}
            />
            <FormInput
              type="number"
              placeholder="* Points"
              name="points"
              value={formData.points}
              handleChange={handleChange}
            />
            <FormInput
              type="text"
              placeholder="* Place"
              name="place"
              value={formData.place}
              handleChange={handleChange}
            />
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="winner"
                  checked={formData.winner}
                  value={formData.winner}
                  onChange={() => {
                    setFormData({ ...formData, winner: !formData.winner });
                  }}
                />{' '}
                Winner
              </p>
            </div>
            {/* winner */}
            <FormInput
              type="text"
              placeholder="Participant Image"
              name="image"
              value={formData.image}
              handleChange={handleChange}
              required={false}
              small="Image from the participant"
            />
            <FormInput
              type="textarea"
              placeholder="Event Bio"
              name="bio"
              value={formData.bio}
              handleChange={handleChange}
              small="Write a bio of the participanr"
              required={false}
            />
            <FormInput
              type="text"
              placeholder="Video Link"
              name="video"
              value={formData.video}
              handleChange={handleChange}
              required={false}
              small="Link to the entry"
            />
            <input type="submit" className="btn btn-primary my-1" />
          </form>
        </div>
      </div>
    )
  );
};

export default AddParticipant;