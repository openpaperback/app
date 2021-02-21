REPO="https://github.com/openpaperback/app"
TARGET=/srv/www/openpaperback
PIPELINE=/srv/www/openpaperback-pipeline

mkdir -p $TARGET

if [ ! -d $PIPELINE ]; then
  git clone $REPO $PIPELINE
fi

cd $PIPELINE
git pull

[ $(cat previous-version.txt 2> /dev/null) ] && PREVIOUS=$(cat previous-version.txt) || PREVIOUS='NULL'
CURRENT=$(git rev-parse HEAD)

echo 'PREVIOUS VERSION --> '$PREVIOUS;
echo 'CURRENT VERSION --> '$CURRENT;

if [ $CURRENT != $PREVIOUS ]; then
  # Run pipeline
  cd $PIPELINE
  npm install
  npm run build

  cp -a ./__sapper__        $TARGET
  cp -a ./static            $TARGET
  cp ./package.json         $TARGET
  cp ./package-lock.json    $TARGET

  # Install deps
  cd $TARGET
  npm install --production

  # Restart service
  npm run pm2:delete
  npm run pm2

  # Save git commit
  cd $PIPELINE
  git rev-parse HEAD > previous-version.txt
fi