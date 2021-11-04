echo "Creation de l'Application a déployer"
mkdir ./Application
mkdir ./Application/www

cp -R backend ./Application/www
cd frontend
npm run build
mv ./build ../Application/www/backend

cd ..

rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 

cp -R db ./Application

cp ./.env ./Application/www/backend

cp docker/docker-compose.yml ./Application/

echo 'Success'

