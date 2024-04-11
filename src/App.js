import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = () => {
      fetch('http://localhost:3000/features')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los features');
          }
          return response.json(); //debe ser en geojson
        })
        .then(data => {
          if (data.type !== "FeatureColletion"){
            throw new Error('La respuesta no es un objeto GeoJSON válido');
          }
          setFeatures(data.features);
        })
        .catch(error => {
          console.error(error);
        });
    };
    fetchFeatures();
  }, []);

  return (
    <div>

      {features.map(feature => (

        <div key={feature.id} className="card position-relative w-25 h-50 p-2 custom-padding">
          <div class="card-body">
            <h5 class="card-title">Evento Sismológico</h5>
            <p class="card-Magnitude">Magnitud: {feature.magnitude} </p>
            <p class="card-place">Lugar: {feature.place}</p>
            <p class="card-time">Tiempo: {feature.time}</p>
            <p class="card-tsunami">Tsunami: {feature.tsunami}</p>
            <p class="card-mag_type">Tipo de Magnitud: {feature.mag_type}</p>
            <p class="card-coordinate">Coordenadas: {feature.coordinates[1]}, {feature.coordinates[0]}</p>
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;
