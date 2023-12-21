import React, { useEffect, useState } from 'react';
import styles from '../styles/ShowSchool.module.css'
const SomeOtherComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getSchools');
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data</h1>
      <ul className={styles.cardList}>
        {data.map((item) => (
          <li key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
            {item.image ? (
              <img src={`http://localhost:3001/uploads/${item.image}`} alt={`Image for ${item.name}`} />
            ) : (
              <p>No image available</p>
            )}
            </div>
            <div className={styles.textContainer}>
              <h2>{item.name}</h2>
              <p>{item.city}</p>
            </div>
            <div className={styles.addressContainer}>
              <p>{item.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SomeOtherComponent;
