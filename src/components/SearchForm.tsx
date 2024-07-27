import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Country, State, City }  from 'country-state-city';
import apiClient from '../api/apiClient';
import { Donormodel} from '../common';
import DonorList from './DonorList';


const SearchForm: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [donors, setDonors] = useState<Donormodel[]>([]);

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Initialize country options
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    // Update states based on selected country
    if (country) {
      setStates(State.getStatesOfCountry(country));
      setState(''); // Reset state when country changes
      setCity('');  // Reset city when country changes
    }
  }, [country]);

  useEffect(() => {
    // Update cities based on selected state
    if (state) {
      setCities(City.getCitiesOfState(country, state));
      setCity(''); // Reset city when state changes
    }
  }, [state, country]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (country && state && city) {
        apiClient.get(`/BloodDonors?country=${country}&state=${state}&city=${city}`)
          .then((response: { data: Donormodel[] }) => {
            setDonors(response.data); // Set the fetched data to the state
            if (response.data.length > 0) {
              setMessage('');
            }
            else {
              setMessage('No donors found');
            }
          })
          .catch((error) => {
            console.error(error);
        });
    }
  };

  return (
    <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="Blood Group">
        <span className="required-field"></span>
        <Form.Label>Blood Group</Form.Label>
        <Form.Control
          as="select"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="country">
        <span className="required-field"></span>
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="state">
        <span className="required-field"></span>
        <Form.Label>State</Form.Label>
        <Form.Control
          as="select"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={!country} // Disable if no country is selected
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.isoCode}>
              {s.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="city">
        <span className="required-field"></span>
        <Form.Label>City</Form.Label>
        <Form.Control
          as="select"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!state} // Disable if no state is selected
        >
          <option value="">Select City</option>
          {cities.map((ct) => (
            <option key={ct.name} value={ct.name}>
              {ct.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

     <Button variant="primary" style={{ marginTop: '10px' }} type="submit">Submit</Button>

    </Form>
    {donors.length > 0 && <DonorList donors={donors} />} 
    {message && <p className={"text-danger"}>{message}</p>}
    </div>
  );
};

export default SearchForm;
