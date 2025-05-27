const fetchRoute = async () => {
  const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
    method: 'POST',
    headers: {
      'Authorization': '12092741f5bd3bde2098c7576f3f863e', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      coordinates: [
        [-46.625290, -23.533773],
        [-46.634420, -23.548900]  
      ]
    })
  });

  const data = await response.json();
  console.log('Rota:', data);
};

fetchRoute();
