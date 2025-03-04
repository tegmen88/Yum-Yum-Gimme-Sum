import { IMenuItem } from '../interfaces/MenuItemInterface.ts';

let API_KEY = '';
const API_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

// Funktion för att hämta API nyckeln
export const getApiKey = async (): Promise<string> => {
    try {

        // Om API-nyckeln redan är hämtad, återanvänderman den
        if (API_KEY) {
            console.log('API-nyckeln återanvänds:', API_KEY);
            return API_KEY;
        }

        const response = await fetch(`${API_URL}/keys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });


        // Kontrollera HTTP-status
        if (!response.ok) {
            throw new Error(
                response.status === 401
                    ? 'Access key saknas eller är ogiltig.'
                    : response.status === 404
                        ? 'Endpointen /keys hittades inte.'
                        : `Misslyckades att hämta API-nyckel.`
            );
        }

        // Läsa och logga serverns svar
        const data = await response.json();
        console.log('Serverns svar:', data);

        // Nu hämtar vi nyckeln från `key`-propertyn i JSON-objektet
        if (!data || !data.key) {
            throw new Error('Svaret från servern saknade en giltig API-nyckel.');
        }

        const apiKey = data.key;
        console.log('API-nyckeln hämtades:', apiKey);
        return apiKey;
    } catch (error) {
        console.error('Fel vid hämtning av API-nyckel:', error);
        throw error;
    }
};

// Funktion för att hämta menyn
export const fetchMenu = async (): Promise<{ items: IMenuItem[] }> => {
    try {

        const menuEndpoint = `${API_URL}/menu`;

        // Hämta API-nyckeln från en säker källa (eller använd en fix nyckel för nu)
        const apiKey = 'yum-3PqATVLPR8zw2xRn';
        console.log('Använder API-nyckel:', apiKey);
        console.log('Hämtar meny från URL:', menuEndpoint);

        // Skicka förfrågan till menyns endpoint
        const response = await fetch(menuEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-zocom': apiKey,
            },
        });

        console.log('Response status:', response.status);

        // Kontroll om förfrågan lyckades
        if (!response.ok) {
            // Logga felmeddelande för debugging
            const errorText = await response.text();
            console.error('Serverns felmeddelande:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Returnera JSON-data (fetch-konverterar JSON automatiskt)
        const data = await response.json();
        console.log('Hämtad menydata:', data);

        // Returnera det bearbetade API-svaret
        return data;

    } catch (error) {
        console.error('Fel vid hämtning av meny:', error);
        throw error;
    }
};

// Skapa tenant frö att slutföra beställningen och placeorder
export const createTenant = async (apiKey: string, tenantName: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/tenant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey,
            },


            body: JSON.stringify({ name: tenantName }), // Tenantens namn
        });

        if (!response.ok) {
            throw new Error(
                `Misslyckades att skapa tenant. Status: ${response.status}`
            );
        }

        console.log("Tenant skapades framgångsrikt.", response, tenantName, response.status);
    } catch (error) {
        console.error("Fel vid skapande av tenant:", error);
        throw error;
    }
};

// Funktion för att lägga en orderbeställning
export const placeOrder = async (tenant: string, apiKey: string, items: number[]) => {

    // Kontrollera att alla parametrar är giltiga
    if (!tenant || typeof tenant !== "string") {
        throw new Error("Tenant saknas eller är inte en giltig sträng.");
    }
    if (!apiKey || typeof apiKey !== "string") {
        throw new Error("API-nyckel saknas eller är inte en sträng.");
    }
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items måste vara en array och innehålla minst ett objekt.");
    }

    try {
        const endpoint = `${API_URL}/${tenant}/orders`;
        console.log("Anropar endpoint:", endpoint);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey,
            },
            body: JSON.stringify({ items }),
        });

        // Kontrollera om förfrågan lyckades
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Misslyckades att lägga order. Status: ${response.status} - ${errorText}`);
        }

        // Returnera serverns svar
        const data = await response.json();
        console.log("Ordern lades korrekt:", data);

        return data;
    } catch (error) {
        console.error("Fel vid orderläggning:", error);
        throw error;
    }
};