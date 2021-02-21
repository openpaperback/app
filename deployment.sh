REPO="https://github.com/openpaperback/app"
TARGET=/srv/www/openpaperback
PIPELINE=/srv/www/openpaperback-pipeline

mkdir -p $TARGET

if [ ! -d $PIPELINE ]; then
  git clone $REPO $PIPELINE
  cd $PIPELINE
else
  cd $PIPELINE
  git pull
fi


[ $(cat previous-version.txt 2> /dev/null) ] && PREVIOUS=$(cat previous-version.txt) || PREVIOUS='NULL'
CURRENT=$(git rev-parse HEAD)

echo 'PREVIOUS VERSION --> '$PREVIOUS;
echo 'CURRENT VERSION --> '$CURRENT;

if [ $CURRENT != $PREVIOUS ]; then
  cd $PIPELINE
  npm install
  npm run build

  cp -a ./__sapper__        $TARGET
  cp -a ./static            $TARGET
  cp ./package.json         $TARGET
  cp ./package-lock.json    $TARGET

  cd $TARGET
  npm install --production

  git rev-parse HEAD > previous-version.txt
fi