import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import apiClient from '../api/apiClient';
import './DonorForm.css';
import { Country, State, City }  from 'country-state-city';
import { Donormodel } from '../common';
import { AxiosResponse } from 'axios';

interface DonorFormProps {
  donor?: Donormodel | null; // Optional donor object for editing
  setDonors?: React.Dispatch<React.SetStateAction<Donormodel[]>>; // Update donor list
  setEditingDonor?: React.Dispatch<React.SetStateAction<Donormodel | null>>; // Optional setter for closing edit modal
}


const DonorForm: React.FC<DonorFormProps> =  ({ donor, setDonors, setEditingDonor }) => {
  
const [country, setCountry] = useState<string>(donor ? donor.country : '');
const [state, setState] = useState<string>(donor ? donor.state : '');
const [city, setCity] = useState<string>(donor ? donor.city : '');
const [fullName, setFullName] = useState<string>(donor ? donor.fullName : '');
const [mobile, setMobile] = useState<string>(donor ? donor.mobile : '');
const [email, setEmail] = useState<string>(donor ? donor.email : '');
const [age, setAge] = useState<number | string>(donor ? donor.age : '');
const [bloodGroup, setBloodGroup] = useState<string>(donor ? donor.bloodGroup : '');
const [countries, setCountries] = useState<any[]>([]);
const [states, setStates] = useState<any[]>([]);
const [cities, setCities] = useState<any[]>([]);
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const [validated, setValidated] = useState(false);
const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState<'success' | 'error'>('success');

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    const newDonor: Partial<Donormodel> = {
      fullName,
      mobile,
      email,
      bloodGroup,
      city,
      country,
      state,
      age: typeof age === 'string' ? parseInt(age) : age,
    };

    try {
      let response: AxiosResponse<any, any>;
      if (donor) {
        response = await apiClient.put(`/BloodDonors/${donor.id}`, newDonor);
        if (response.status === 200) {
          setDonors?((prevDonors: Donormodel[]) =>
            prevDonors.map((d) => (d.id === donor.id ? { ...d, ...newDonor } : d))
          ): null;
          if (setEditingDonor) setEditingDonor(null);
        }
      } else {
        response = await apiClient.post('/BloodDonors', newDonor);
        if (response.status === 201) {
          setDonors?((prevDonors: Donormodel[]) => [...prevDonors, response.data]): null;
        }
      }

      setMessage('Donor saved successfully');
      setMessageType('success');
      form.reset();
      setValidated(false);
    } catch (error) {
      console.error('Failed to save donor', error);
      setMessage('Failed to save donor');
      setMessageType('error');
    }
  };

  const messageClass = messageType === 'success' ? 'text-success' : 'text-danger';

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomFullName">
          <span className="required-field"></span>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name='fullName'
            required
            type="text"
            placeholder="Full Name"
            defaultValue=""
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomMobile">
          <span className="required-field"></span>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            name='mobile'
            required
            type="text"
            placeholder="Mobile"
            defaultValue=""
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustomEmail">
          <span className="required-field"></span>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            required
            type="email"
            placeholder="Email"
            defaultValue=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
      
          <Form.Group as={Col} md="6" controlId="validationCustomAge">
            <span className="required-field"></span>
            <Form.Label>Age</Form.Label>
            <Form.Control
              name='age'
              required
              type="number"
              placeholder="Age"
              defaultValue=""
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid age.
            </Form.Control.Feedback>
          </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="Blood Group">
          <span className="required-field"></span>
          <Form.Label>Blood Group</Form.Label>
          <Form.Control
            name='bloodGroup'
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
            name='country'
            as="select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
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
            required = {!state}
            name='state'
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
            required = {!city}
            name='city'
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
    </Row>
      {message && <p className={messageClass}>{message}</p>}
    </Form>
  );
}

export default DonorForm;
