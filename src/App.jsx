import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { PatientsList } from "./components/PatientsList";

function App() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const updateLocalStorage = () => {
      const patientLS = () =>
        JSON.parse(localStorage.getItem("Patients") ?? []);
      setPatients(patientLS);
    };

    updateLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("Patients", JSON.stringify(patients));
  }, [patients]);

  const deletePatient = (id) => {
    const updatePatient = patients.filter((patient) => patient.id !== id);
    setPatients(updatePatient);
  };

  return (
    <div className='App container mx-auto mt-20'>
      <Header />
      <div className='mt-12 md:flex'>
        <Form
          setPatient={setPatient}
          patient={patient}
          patients={patients}
          setPatients={setPatients}
        />
        <PatientsList
          deletePatient={deletePatient}
          patients={patients}
          setPatient={setPatient}
        />
      </div>
    </div>
  );
}

export default App;
