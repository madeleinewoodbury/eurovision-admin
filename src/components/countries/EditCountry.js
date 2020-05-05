import React, { useState, useContext, useEffect } from 'react';
import EscContext from '../../context/esc/escContext';
import AuthContext from '../../context/auth/authContext';
import FormInput from '../forms/FormInput';

const EditCountry = ({ match, history }) => {
  const escContext = useContext(EscContext);
  const authContext = useContext(AuthContext);
  const { country, getCountry, loading, editCountry } = escContext;
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    code: '',
    flag: '',
    image: '',
    firstParticipation: '',
    bio: '',
    youtube: '',
  });

  useEffect(() => {
    country === null && getCountry(match.params.id);
    if (country !== null) {
      setFormData({
        name: loading || !country.name ? '' : country.name,
        capital: loading || !country.capital ? '' : country.capital,
        code: loading || !country.code ? '' : country.code,
        flag: loading || !country.flag ? '' : country.flag,
        image: loading || !country.image ? '' : country.image,
        firstParticipation:
          loading || !country.firstParticipation
            ? ''
            : country.firstParticipation,
        bio: loading || !country.bio ? '' : country.bio,
        youtube: loading || !country.youtube ? '' : country.youtube,
      });
    }
  }, [loading, getCountry, match.params.id, country]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    editCountry(match.params.id, formData);
    history.push('/');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="large">
          <i className="far fa-flag"></i>Edit Country
        </h1>
        <p>* = required field</p>
        <form className="form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="* Country Name"
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="* Country Capital"
            name="capital"
            value={formData.capital}
            handleChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="* Country Code"
            name="code"
            value={formData.code}
            handleChange={handleChange}
            maxLength={2}
            small="Two letter country code"
          />
          <FormInput
            type="text"
            placeholder="* Country Flag"
            name="flag"
            value={formData.flag}
            handleChange={handleChange}
          />
          <FormInput
            type="text"
            placeholder="Country Image"
            name="image"
            value={formData.image}
            handleChange={handleChange}
            required={false}
            small="Image of country in the Eurovision Song Contest"
          />
          <FormInput
            type="number"
            placeholder="* Firts Participation"
            name="firstParticipation"
            value={formData.firstParticipation}
            handleChange={handleChange}
            small="First year country participated"
          />
          <FormInput
            type="textarea"
            placeholder="Country Bio"
            name="bio"
            value={formData.bio}
            handleChange={handleChange}
            small="Write a bio of the country's history in the Eurovision Song Contest"
            required={false}
          />
          <FormInput
            type="text"
            placeholder="Youtube Link"
            name="youtube"
            value={formData.youtube}
            handleChange={handleChange}
            required={false}
            small="Link to video of country in Eurovision Song Contest"
          />
          <input type="submit" className="btn btn-primary my-1" />
        </form>
      </div>
    </div>
  );
};

export default EditCountry;
