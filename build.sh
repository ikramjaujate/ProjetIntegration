echo "Creation de l'Application a déployer"
mkdir ./Application
mkdir ./Application/www

cp -R backend ./Application/www
cd frontend
npm run build
cd ..

cp -R frontend/build ./Application/www/backend

rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 


cp docker/docker-compose.yml ./Application/

echo 'Success'

