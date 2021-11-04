echo "Creation de l'Application a déployer"
mkdir ./Application
mkdir ./Application/www

cd frontend
npm run build
cd ..
cp -R backend ./Application/www
mv frontend/build ./Application/www/backend
rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 

cp -R db ./Application

cp .env ./Application/www/backend

cp docker/docker-compose.yml ./Application/

echo 'Success'

