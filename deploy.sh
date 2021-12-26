## Config
SID="$1"
REPL_ID="$2"
COMMAND="sh%20./pull.sh"
REPLIT_API="$3"

## Execution
URL="$REPLIT_API/$REPL_ID?sid=$SID&command=$COMMAND"

echo "$(curl $URL)"
exit 1
