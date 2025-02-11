from environs import Env

# Créer un objet Env
env = Env()

# Charger les variables d'environnement depuis un fichier .env
env.read_env()

# Accéder à la variable d'environnement
open_api_key = env.str("OPEN_API_KEY")
stablehorde_api_key = env.str("STABLEHORDE_API_KEY")
stablehorde_url = env.str("STABLEHORDE_URL")