const http = require('http');
import fetch from 'node-fetch';

const DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-API-dfads'
};

http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            ...DEFAULT_HEADERS
        }).end();
    } else {
        fetch('http://localhost:9090/ldap/testLdapConnection', {
            method: 'POST',
            body: JSON.stringify({
                "connectoinURL": "ldap://zqa-276.eng.zimbra.com:389",
                "bindDN": "uid=zimbra,cn=admins,cn=zimbra",
                "bindCredentials": "m1nOOBGJ4A",
                "bindType": "simple",
                "userDN": "ou=people,dc=zqa-276,dc=eng,dc=zimbra,dc=com",
                "objectClasses": "zimbraAccount",
                "uoi": "uid"
            })
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            console.log(data)
        }).catch(e => {
            console.log(e)
        });

        res.writeHead(200, {
            ...DEFAULT_HEADERS
        }).end(JSON.stringify({a: 'dfas'}));
    }
}).listen(process.env.PORT);