echo "Creation de l'Application a déployer"
cd frontend
npm run build
cd ..
mkdir ./Application
mkdir ./Application/www

cp -R backend ./Application/www

cp -R frontend/build ./Application/www/backend

rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 

cp -R db ./Application

ls -a Application/db
cp ./.env ./Application/www/backend

cp docker/docker-compose.yml ./Application/

echo 'Success'

