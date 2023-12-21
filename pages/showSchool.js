import React, { useEffect, useState } from 'react';
import styles from '../styles/ShowSchool.module.css'
const SomeOtherComponent = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getSchools');
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result);
        setSearchResults(result); 
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on the search query
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)
    );

    setSearchResults(filteredResults);
  };
  return (
    <div>
      <div className={styles.search}>
        <input 
         placeholder='Search your School'
         value={searchQuery}
         onChange={handleSearch}
          />
        <span style={{ fontSize: '1.2rem' }}>Search</span>
      </div>
      <ul className={styles.cardList}>
        {searchResults.map((item) => (
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
