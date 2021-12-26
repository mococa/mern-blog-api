getEnv(){
    echo $(grep $1 .env | cut -d '=' -f2)
}

## Config
SID=$(getEnv SID)
REPL_ID=$(getEnv REPL_ID)
COMMAND="sh%20./pull.sh"
REPLIT_API=$(getEnv REPLIT_API)

## Execution
URL="$REPLIT_API/$REPL_ID?sid=$SID&command=$COMMAND"
echo $URL
echo "$(curl $URL)"
exit 1
