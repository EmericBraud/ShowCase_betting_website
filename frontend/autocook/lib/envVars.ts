const envVars = {
    API_URL: process.env.API_URL || 'http://localhost:8080', 
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:mypassword@localhost:5432/db',
  };
  
  export default envVars;