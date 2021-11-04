echo "Creation de l'Application a déployer"
mkdir ./Application
mkdir ./Application/www

cp -R backend ./Application/www
cd frontend
npm run build
cp -R ./build ../Application/www/backend
ls -a 


cd ..

rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 

cp -R db ./Application

cp ./.env ./Application/www/backend

cp docker/docker-compose.yml ./Application/

ls -a Application/www/backend
echo 'Success'

