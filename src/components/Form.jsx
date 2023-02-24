import React from "react";
import { useState, useEffect } from "react";
import { Error } from "./Error";

export const Form = ({ patients, setPatients, patient, setPatient }) => {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
    }
  }, [patient]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const randomDate = Date.now().toString(36);

    return random + randomDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, owner, email, date, symptoms].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    const patientObject = {
      name,
      owner,
      email,
      date,
      symptoms,
    };

    if (patient.id) {
      patientObject.id = patient.id;

      const updatePatients = patients.map((patientState) =>
        patientState.id === patient.id ? patientObject : patientState
      );

      setPatients(updatePatients);
      setPatient({});
    } else {
      patientObject.id = generarId();
      setPatients([...patients, patientObject]);
    }

    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptoms("");
  };

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Patient Monitoring</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Add Patients and {""}
        <span className='text-indigo-600 font-bold'>Edit</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >
        {error && <Error message='All fields are required' />}
        <div className='mb-5'>
          <label
            htmlFor='pet'
            className='block text-gray-700 uppercase font-bold'
          >
            Pet Name
          </label>
          <input
            id='pet'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text'
            placeholder='pet name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='owner'
            className='block text-gray-700 uppercase font-bold'
          >
            Owner Name
          </label>
          <input
            id='owner'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text'
            placeholder='owner name'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block text-gray-700 uppercase font-bold'
          >
            Email
          </label>
          <input
            id='email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='discharged'
            className='block text-gray-700 uppercase font-bold'
          >
            Discharged
          </label>
          <input
            id='discharged'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='symptoms'
            className='block text-gray-700 uppercase font-bold'
          >
            Symptoms
          </label>
          <textarea
            id='symptoms'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='describe the symptoms'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>
        <input
          type='submit'
          className='hover:bg-indigo-700 cursor-pointer bg-indigo-600 w-full p-3 rounded-md text-white font-bold'
          value={patient.id ? "Save Changes" : "Add Patient"}
        />
      </form>
    </div>
  );
};
