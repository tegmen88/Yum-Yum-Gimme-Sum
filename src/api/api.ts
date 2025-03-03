
let API_KEY = '';
const API_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

// Funktion för att hämta API nyckeln
export const getApiKey = async () => {
    const response = await fetch(`${API_URL}/keys`);
    const data = await response.json();
    API_KEY = data.key;
};

// Funktion för att hämta menyn
/*export const fetchMenu = async () => {
    const response = await fetch(`${API_URL}/menu`, {
        headers: { 'x-zocom': API_KEY },
    });
    return response.json();
};*/

/*export const fetchMenu = async (): Promise<any> => {
    const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};*/

export const fetchMenu = async () => {
    try {
        const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu'); // Placera rätt URL här
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error('Error fetching menu:', err);
        throw err; // Skicka vidare felet för Redux-thunk att hantera
    }
};

// Funktion för att placera en beställning
export const placeOrder = async (items: any[]) => {
    const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: {
            'x-zocom': API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }), // Skicka med menyn som parameter
    });
    if (!response.ok) {
        throw new Error('Misslyckades med att placera beställning');
    }
    return response.json(); // Returnera hela svaret så att komponenten kan bearbeta det
};
