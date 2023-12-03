import React, { useState, useEffect } from 'react';
import Table from './Table';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://assets.alippo.com/catalog/static/data.json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Table data={data} />
    </div>
  );
}

export default App;
