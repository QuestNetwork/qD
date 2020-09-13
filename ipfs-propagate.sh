#!/bin/sh
# ——————————————————————————————————————
# name: ipfs-propagate.sh
# main: Jaidyn Ann <jadedctrl@teknik.io>
# desc: Shell functions for helping with
#       using the Piñata and Eternum
#       IPFS pinning services.
#       Also for interfacing with another
#       node over SSH.

# ——————————————————————————————————————
# ETERNUM

# HASH API_KEY [NAME] → JSON
# Pin a hash to Eternum.
function pin_eternum {
	hash="$(ipfs resolve "$1" | address_to_cid)"
	api_key="$2"
	name="$3"

	ipfs swarm connect /dns4/door.eternum.io/tcp/4001/ipfs/QmUAzL9Fpp1fsZnrkANcitMevCoTWKP3TJcgTuc2D3b7vi

	data="{\"hash\": \"$hash\""
	if test -n "$name"; then
    		name=", \"name\": \"${name}\"}"
	else    name="}"
	fi
	data="${data}${name}"

	curl -s 'https://www.eternum.io/api/pin/' \
	     -X POST -d "${data}" \
	     -H 'Content-Type: application/json' \
	     -H "Authorization: Token ${api_key}"
	echo
}

# API_KEY → HASH(ES)
# List all pinned hashed on Eternum.
function pin_ls_eternum {
	api_key="$1"

	json_pin_ls_eternum "$api_key" \
	| json_hash_eternum
	echo
}

# HASH API_KEY → JSON
# Remove a pinned hash from Eternum.
function pin_rm_eternum {
	hash="$(ipfs resolve "$1" | address_to_cid)"
	api_key="$2"

	curl -s "https://www.eternum.io/api/pin/${hash}/" \
	     -X DELETE \
	     -H 'Content-Type: application/json' \
	     -H "Authorization: Token ${api_key}"
	echo
}

# NAME API_KEY → HASH
# Return the hash tied to a given name.
function pin_name_eternum {
	name="$1"
	api_key="$2"

	json_pin_ls_eternum "$api_key" \
	| json_linebreak_eternum \
	| grep "\"name\":\"${name}\"" \
	| json_hash_eternum \
	| head -1
}

# NAME API_KEY → JSON
# Remove a named pin on Eternum.
function pin_name_rm_eternum {
	name="$1"
	api_key="$2"
	pin_rm_eternum "$(pin_name_eternum "$name" "$api_key")" "$api_key"
}

function pin_name_replace_eternum {
	name="$1"
	hash="$(ipfs resolve "$2" | address_to_cid)"
	api_key="$3"

	pin_name_rm_eternum "$name" "$api_key"
	pin_eternum "$hash" "$api_key" "$name"
}

# --------

# |JSON → BROKEN_JSON
# Takes piped JSON, and seperates each pin item into its own line (of broken JSON)
function json_linebreak_eternum {
	sed -e "/},{\"hash\"/s//&\\
\"hash\"/g" \
	| sed "s%{\"count\".*\"results\":\[{\"hash"%'%' \
	| sed 's%^.:"%%'
}

# API-KEY → JSON
# Returns a the raw JSON from a pin ls request to Eternum.
function json_pin_ls_eternum {
	api_key="$1"
	curl -s 'https://www.eternum.io/api/pin/' \
	     -X GET \
	     -H 'Content-Type: application/json' \
	     -H "Authorization: Token ${api_key}"
}

# |JSON → HASH(ES)
# Takes any Eternum JSON containing IPFS hashes, and prints all hashes.
function json_hash_eternum {
	json_linebreak_eternum \
	| sed 's%.*"hash":"%%' \
	| sed 's%".*%%'
}



# ——————————————————————————————————————
# PIÑATA

# HASH API_KEY SECRET_API_KEY [MULTIADDR] [NAME] → JSON
# Pin a given hash to Piñata.cloud
function pin_pinata {
	hash="$(ipfs resolve "$1" | address_to_cid)"
	api_key="$2"
	secret_api_key="$3"
	maddr_b="$4"
	name="$5"
	maddr_a="$(my_multiaddr)"

	maddrs="\"host_nodes\": [${maddr_a}"
	if test -n "$maddr_b"; then
    		maddrs="${maddrs}, ${maddr_b} ]}"
    	else    maddrs="${maddrs} ]}"
	fi

	metadata=""
	if test -n "$name"; then
    		metadata="{ \"pinataMetadata\": {\"name\": \"${name}\", \"keyvalues\": {}},"
    	else    metadata="{"
    	fi

	data="${metadata} \"hashToPin\": \"${hash}\", ${maddrs}"

	curl -s 'https://api.pinata.cloud/pinning/pinHashToIPFS' \
	     -X POST -d "$data" \
	     -H 'Content-Type: application/json' \
	     -H "pinata_api_key: $api_key" \
	     -H "pinata_secret_api_key: $secret_api_key"
	echo
}

# API_KEY SECRET_API_KEY → JSON
# Print all pinned Piñata hashes.
function pin_ls_pinata {
	api_key="$1"
	secret_api_key="$2"

	curl -s 'https://api.pinata.cloud/data/pinList?status=pinned' \
	     -H GET \
	     -H "pinata_api_key: $api_key" \
	     -H "pinata_secret_api_key: $secret_api_key" \
	| json_hash_pinata
}

# HASH API_KEY SECRET_API_KEY → JSON
# Remove a pinned hash from Piñata.
function pin_rm_pinata {
	hash="$(ipfs resolve "$1" | address_to_cid)"
	api_key="$2"
	secret_api_key="$3"

	data="{ \"ipfs_pin_hash\": \"${hash}\" }"

	curl -s 'https://api.pinata.cloud/pinning/removePinFromIPFS' \
	     -X POST -d "$data" \
	     -H "pinata_api_key: $api_key" \
	     -H "pinata_secret_api_key: $secret_api_key"
	echo
}

# NAME API_KEY SECRET_API_KEY → JSON
# Return pins with the given user-defined name from Piñata.
function pin_name_pinata {
	name="$1"
	api_key="$2"
	secret_api_key="$3"
	curl -s "https://api.pinata.cloud/data/pinList?status=pinned&metadata[name]=${name}" \
	     -X GET \
	     -H "pinata_api_key: $api_key" \
	     -H "pinata_secret_api_key: $secret_api_key" \
	| json_hash_pinata
}

# NAME API_KEY SECRET_API_KEY → JSON
# Delete pin with the given name from Piñata."
function pin_name_rm_pinata {
	name="$1"
	api_key="$2"
	secret_api_key="$3"

	pin_name_json="$(pin_name_pinata "$name" "$api_key" "$secret_api_key")"
	pin_name_hash="$(echo "$pin_name_json" | json_hash_pinata)"

	pin_rm_pinata "$pin_name_hash" "$api_key" "$secret_api_key"
}

# NAME HASH API_KEY SECRET_API_KEY → JSON
function pin_name_replace_pinata {
	name="$1"
	hash="$2"
	api_key="$3"
	secret_api_key="$3"

	pin_name_rm_pinata "$name" "$api_key" "$secret_api_key"
	pin_pinata "$hash" "$api_key" "$secret_api_key" "" "$name"
}

# --------

# |JSON → HASH(ES)
# Returns all hashes in the piped Piñata JSON data.
function json_hash_pinata {
	tr ',' '\n' \
	| grep "ipfs_pin_hash" \
	| sed 's%.*"ipfs_pin_hash":"%%' \
	| sed 's%".*%%'
}



# ——————————————————————————————————————
# SSH

# HOST COMMAND_STRING ENV_STRING
# Run a given command on an SSH host.
function command_ssh {
	host="$1"
	command="$2"
	potential_env="$3"

	if test -n "$potential_env"; then
    		command="env ${potential_env} ${command}"
	fi

	ssh "$host" "$command"
}

# PEER-MULTIADDR HOST ENV_STRING
# Connect an IPFS daemon on another computer to the given multiaddr, over SSH.
function peer_ssh {
	multiaddr="$1"
	host="$2"
	env="$3"

	command_ssh "$host" "ipfs swarm connect $multiaddr" "$env"
}

# HOST ENV_STRING → PEER-IPV4-MULTIADDR
# Get the public IPV4 multiaddr of an IPFS daemon over SSH.
function multiaddr_ssh {
	host="$1"
	env="$2"

	command_ssh "$host" "ipfs id" "$env" \
	| id_to_multiaddr
}

# HASH HOST ENV_STRING
# Pin a given hash to an IPFS daemon over SSH.
function pin_ssh {
	hash="$1"
	host="$2"
	env="$3"

	command_ssh "$host" "ipfs pin add -r --progress $hash" "$env"
}

# HASH HOST ENV_STRING
# Pin a given hash to an IPFS daemon over SSH.
function pin_rm_ssh {
	hash="$1"
	host="$2"
	env="$3"

	command_ssh "$host" "ipfs pin rm $hash" "$env"
}

# HOST ENV_STRING
# List all pinned hashes from an IPFS daemon over SSH.
function pin_ls_ssh {
	host="$1"
	env="$2"

	command_ssh "$host" "ipfs pin ls" "$env"
}



# ——————————————————————————————————————
# MISC

# |ADDRESS → CID
# Convert a piped address (/ipfs/sdfsdf) to CID (sdfsdf)
function address_to_cid {
	sed 's%/ipfs/%%'
}

# NULL → MULTIADDR
# Return your peer's public IPFS multiaddr
function my_multiaddr {
	ipfs id \
	| id_to_multiaddr
}

# |IPFS_ID_OUTPUT → MULTIADDR
# Take the piped `ipfs id` output, return the public IPv4 multiaddr
function id_to_multiaddr {
	grep "ip4" \
	| tail -1 \
	| awk '{print $1}'
}
