# google-home-notifier
Send notifications from LINE to Google Home by raspberry pi 3

## Raspberry Pi

Clone this repository.
```sh
git clone https://github.com/nisioka/google-home-notifier.git
cd google-home-notifier
```
Use the latest nodejs dist.
```sh
sudo apt-get autoremove nodejs
mkdir .nvm
git clone https://github.com/creationix/nvm.git .nvm/
source .nvm/nvm.sh
nvm install v8.16.0
```
Also install these packages:
```sh
sudo apt-get install git-core libnss-mdns libavahi-compat-libdnssd-dev
```
npm install.
```sh
npm init
npm install google-home-notifier --no-audit
```

## [Optional]After "npm install"

If you do not modify this, warning messages will appear, but it will still work.

Modify the following file "node_modules/mdns/lib/browser.js"
```sh
vi node_modules/mdns/lib/browser.js
```
Find this line:
```javascript
Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo()
, rst.makeAddressesUnique()
];
```
And change to:
```javascript
Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo({families:[4]})
, rst.makeAddressesUnique()
];
```

## Usage
```sh
node google-home-notifier/server_for_line.js
```
