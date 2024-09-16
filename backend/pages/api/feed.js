import Cors from 'cors';

// Initialize CORS middleware with allowed origin
const cors = Cors(
  {
    methods: ['GET', 'HEAD'],
    origin: 'http://localhost:3001', // Allow requests from this origin
  },
  {
    methods: ['GET', 'HEAD'],
    origin: 'http://localhost:80', // Allow requests from this origin
  },
);

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the CORS middleware before handling the request
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const { date, language } = req.query;

    if (!date || !language) {
      return res.status(400).json({ message: 'Missing date or language parameters' });
    }

    const WIKIPEDIA_FEED_API = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${date}`;

    try {
      const response = await fetch(WIKIPEDIA_FEED_API);

      if (!response.ok) {
        throw new Error(`Wikipedia API returned an error: ${response.statusText}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch Wikipedia data', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
